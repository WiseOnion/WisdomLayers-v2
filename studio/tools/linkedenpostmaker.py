import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

from PIL import Image, ImageDraw, ImageFont
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader

# ── Brand ─────────────────────────────────────────────────────────────────────
TEAL       = (13, 148, 136)
TEAL_LIGHT = (204, 251, 241)
TEAL_DARK2 = (10, 110, 100)
WHITE      = (255, 255, 255)
DARK       = (10, 18, 28)
GRAY       = (100, 115, 128)
RED        = (200, 40, 40)
GREEN      = (22, 163, 74)

W, H   = 1080, 1080
MARGIN = 64
COL    = W - MARGIN * 2

LOGO_PATH   = r'C:\Users\wisem\Downloads\Projects\WisdomLayer\assets\images\Logo.png'
BEFORE_PATH = r'C:\Users\wisem\Downloads\Projects\WisdomLayer\screencapture-pjpressurewashing-2026-03-18-17_14_18.png'
AFTER_PATH  = r'C:\Users\wisem\Downloads\Projects\WisdomLayer\screencapture-file-C-Users-wisem-Downloads-Projects-PJpressure-Copy-index-html-2026-03-18-17_14_44.png'
OUT_PATH    = r'C:\Users\wisem\Downloads\Projects\PJpressure - Copy\PJ_Carousel_v7.pdf'

BOLD = 'C:/Windows/Fonts/arialbd.ttf'
REG  = 'C:/Windows/Fonts/arial.ttf'


def ft(path, size):
    try:
        return ImageFont.truetype(path, size)
    except:
        return ImageFont.load_default()


def new_slide(bg=DARK):
    return Image.new('RGB', (W, H), bg)


def geo(img, line_color, accent_color):
    d = ImageDraw.Draw(img)
    d.line([(W-140, 0), (W, 140)], fill=line_color, width=3)
    d.line([(W-70,  0), (W,  70)], fill=accent_color, width=1)
    d.line([(0, H-140), (140, H)], fill=line_color, width=2)


def slide_num(draw, n, total):
    fn = ft(REG, 19)
    txt = f'{n:02d} / {total:02d}'
    bb = draw.textbbox((0, 0), txt, font=fn)
    draw.text((W - MARGIN - (bb[2]-bb[0]), MARGIN - 6), txt, fill=GRAY, font=fn)


def logo_circle(img, size=80, cx=None, cy=None):
    """Sharp logo circle — render at 8x then downsample for crisp ring edge."""
    if cx is None: cx = MARGIN + size // 2
    if cy is None: cy = MARGIN + size // 2

    scale = 8
    ring_px = 5  # ring width at 1x
    total_1x = size + ring_px * 2
    total = total_1x * scale

    circ = Image.new('RGBA', (total, total), (0, 0, 0, 0))
    cd = ImageDraw.Draw(circ)
    cd.ellipse([0, 0, total-1, total-1], fill=TEAL)
    r = ring_px * scale
    cd.ellipse([r, r, total-r-1, total-r-1], fill=WHITE)

    try:
        logo = Image.open(LOGO_PATH).convert('RGBA')
        inner = size * scale
        logo.thumbnail((inner - 16*scale, inner - 16*scale), Image.LANCZOS)
        lw, lh = logo.size
        circ.paste(logo, ((total-lw)//2, (total-lh)//2), logo)
    except Exception as e:
        print('logo err:', e)

    # Downsample 8x -> 1x
    circ = circ.resize((total_1x, total_1x), Image.LANCZOS)

    mask = Image.new('L', (total_1x, total_1x), 0)
    ImageDraw.Draw(mask).ellipse([0, 0, total_1x-1, total_1x-1], fill=255)

    px = cx - total_1x // 2
    py = cy - total_1x // 2
    img.paste(circ.convert('RGB'), (px, py), mask)


def wrap_text(draw, text, font, max_width):
    """Split text into lines that fit within max_width."""
    words = text.split()
    lines = []
    current = ''
    for word in words:
        test = (current + ' ' + word).strip()
        bb = draw.textbbox((0, 0), test, font=font)
        if bb[2] - bb[0] <= max_width:
            current = test
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def badge(draw, text, color, x, y, w=180, h=52):
    draw.rounded_rectangle([x, y, x+w, y+h], radius=h//2, fill=color)
    fn = ft(BOLD, 28)
    bb = draw.textbbox((0, 0), text, font=fn)
    tw, th = bb[2]-bb[0], bb[3]-bb[1]
    draw.text((x+(w-tw)//2, y+(h-th)//2-1), text, fill=WHITE, font=fn)


def nav_bar(img, draw, n, total, on_teal=False):
    txt_color  = TEAL_LIGHT if on_teal else GRAY
    rule_color = TEAL_DARK2 if on_teal else (35, 48, 58)
    logo_circle(img, size=54, cx=MARGIN+30, cy=MARGIN+30)
    slide_num(draw, n, total)
    draw.text((MARGIN+72, MARGIN+12), 'WisdomLayers', fill=txt_color, font=ft(REG, 20))
    rule_y = MARGIN + 64
    draw.line([(MARGIN, rule_y), (W-MARGIN, rule_y)], fill=rule_color, width=1)
    return rule_y


def hero_crop(path, target_w, target_h, crop_pct):
    """Crop top hero from 1920px source — always scaling down, stays sharp."""
    img = Image.open(path)
    crop_h = int(img.height * crop_pct)
    img = img.crop((0, 0, img.width, crop_h))
    scale = target_w / img.width
    new_h = int(img.height * scale)
    img = img.resize((target_w, new_h), Image.LANCZOS)
    if new_h >= target_h:
        img = img.crop((0, 0, target_w, target_h))
    else:
        bg = Image.new('RGB', (target_w, target_h), (20, 28, 38))
        bg.paste(img, (0, 0))
        img = bg
    return img


def fit_full(path, target_w, target_h):
    """Fit the entire screenshot into target dimensions, centered, no cropping."""
    img = Image.open(path).convert('RGB')
    img.thumbnail((target_w, target_h), Image.LANCZOS)
    bg = Image.new('RGB', (target_w, target_h), (20, 28, 38))
    x = (target_w - img.width) // 2
    y = (target_h - img.height) // 2
    bg.paste(img, (x, y))
    return bg


# ── Slide 1: Hook ─────────────────────────────────────────────────────────────
def slide1(n, total):
    img = new_slide(DARK)
    geo(img, (35, 48, 58), (25, 38, 48))
    draw = ImageDraw.Draw(img)
    rule_y = nav_bar(img, draw, n, total)

    draw.text((MARGIN, rule_y+52), 'CASE STUDY  \u00b7  PJ PRESSURE WASHING',
              fill=TEAL, font=ft(REG, 19))

    y = rule_y + 100
    for line in ['I rebuilt this', 'website from', 'the ground up.']:
        draw.text((MARGIN, y), line, fill=WHITE, font=ft(BOLD, 96))
        y += 104

    draw.text((MARGIN, y+16), 'Swipe to see the transformation  \u2192',
              fill=TEAL_LIGHT, font=ft(REG, 30))

    draw.line([(MARGIN, H-MARGIN-36), (W-MARGIN, H-MARGIN-36)], fill=(35,48,58), width=1)
    draw.text((MARGIN, H-MARGIN-20), 'wisdomlayers.com', fill=GRAY, font=ft(REG, 19))
    return img


# ── Slide 2: Split-screen side-by-side ───────────────────────────────────────
def slide_split(n, total):
    """Both sites side by side — the contrast is instant."""
    img = new_slide(DARK)
    draw = ImageDraw.Draw(img)

    # Nav (no geo lines — image slide feels cleaner without them)
    logo_circle(img, size=54, cx=MARGIN+30, cy=MARGIN+30)
    slide_num(draw, n, total)
    draw.text((MARGIN+72, MARGIN+12), 'WisdomLayers', fill=GRAY, font=ft(REG, 20))
    rule_y = MARGIN + 64
    draw.line([(MARGIN, rule_y), (W-MARGIN, rule_y)], fill=(35,48,58), width=1)

    # Two card slots
    card_top = rule_y + 12
    card_bot = H - MARGIN - 68
    card_h   = card_bot - card_top
    gap      = 16
    card_w   = (COL - gap) // 2

    for i, (path, label, color) in enumerate([
        (BEFORE_PATH, 'BEFORE', RED),
        (AFTER_PATH,  'AFTER',  GREEN),
    ]):
        cx = MARGIN + i * (card_w + gap)

        # Shadow + white card
        draw.rounded_rectangle([cx+4, card_top+4, cx+card_w+4, card_bot+4],
                                radius=10, fill=(4,8,14))
        draw.rounded_rectangle([cx, card_top, cx+card_w, card_bot],
                                radius=10, fill=WHITE)

        inner = 5
        shot = fit_full(path, card_w - inner*2, card_h - inner*2)
        img.paste(shot, (cx+inner, card_top+inner))

        # Badge centered above card
        bw, bh = 140, 44
        bx = cx + (card_w - bw) // 2
        draw.rounded_rectangle([bx, card_bot+10, bx+bw, card_bot+10+bh],
                                radius=bh//2, fill=color)
        fn = ft(BOLD, 24)
        bb = draw.textbbox((0,0), label, font=fn)
        tw, th = bb[2]-bb[0], bb[3]-bb[1]
        draw.text((bx+(bw-tw)//2, card_bot+10+(bh-th)//2-1), label, fill=WHITE, font=fn)

    # Vertical divider between cards
    mid = MARGIN + card_w + gap // 2
    draw.line([(mid, card_top+20), (mid, card_bot-20)], fill=(35,48,58), width=2)

    return img


# ── Slides 3 & 4: Full before / Full after ────────────────────────────────────
def slide_shot(path, label, badge_color, n, total, crop_pct, caption_text=''):
    img = new_slide(DARK)
    geo(img, (35, 48, 58), (25, 38, 48))
    draw = ImageDraw.Draw(img)
    rule_y = nav_bar(img, draw, n, total)

    card_top = rule_y + 14
    card_bot = H - MARGIN - 72
    card_h   = card_bot - card_top
    inner    = 6

    draw.rounded_rectangle([MARGIN+5, card_top+5, MARGIN+COL+5, card_bot+5],
                            radius=12, fill=(4,8,14))
    draw.rounded_rectangle([MARGIN, card_top, MARGIN+COL, card_bot],
                            radius=12, fill=WHITE)

    shot = hero_crop(path, COL - inner*2, card_h - inner*2, crop_pct)
    img.paste(shot, (MARGIN+inner, card_top+inner))

    badge(draw, label, badge_color, MARGIN, card_bot+12, w=180, h=50)

    if caption_text:
        fn_cap = ft(REG, 17)
        bb = draw.textbbox((0, 0), caption_text, font=fn_cap)
        tw = bb[2] - bb[0]
        draw.text((W - MARGIN - tw, card_bot + 22), caption_text, fill=GRAY, font=fn_cap)

    draw.line([(MARGIN, H-MARGIN-10), (W-MARGIN, H-MARGIN-10)], fill=(35,48,58), width=1)
    return img


# ── Slide 5: What Changed ─────────────────────────────────────────────────────
def slide5(n, total):
    img = new_slide(DARK)
    geo(img, (35, 48, 58), (25, 38, 48))
    draw = ImageDraw.Draw(img)
    rule_y = nav_bar(img, draw, n, total)

    draw.text((MARGIN, rule_y+48), 'WHAT CHANGED', fill=TEAL, font=ft(REG, 20))

    results = [
        ('01', 'Unclear messaging \u2192 a headline that tells visitors exactly who they are and why to call'),
        ('02', 'No clear next step \u2192 contact buttons placed where decisions get made'),
        ('03', 'Credibility buried \u2192 years of experience and certifications front and center'),
        ('04', 'Desktop only \u2192 built responsive, optimized for mobile traffic'),
        ('05', 'No proof of work \u2192 a before & after gallery that sells the service for them'),
        ('06', 'Reviews overlooked \u2192 a Google review carousel that builds trust on arrival'),
        ('07', 'No brand consistency \u2192 clean typography, color, and layout across every page'),
    ]

    text_x    = MARGIN + 82
    text_font = ft(BOLD, 26)
    num_font  = ft(BOLD, 52)
    max_w     = W - MARGIN - text_x
    line_h    = 30  # px per wrapped line

    # Pre-calculate each row's text block height
    row_blocks = []
    for num, text in results:
        lines = wrap_text(draw, text, text_font, max_w)
        row_blocks.append((num, lines, len(lines) * line_h))

    # Distribute all available vertical space evenly
    content_top  = rule_y + 72
    content_bot  = H - MARGIN - 20
    total_text_h = sum(bh for _, _, bh in row_blocks)
    total_space  = content_bot - content_top - total_text_h
    # Space is split: gap above each row + gap below last row = len rows gaps
    row_pad = max(16, total_space // (len(row_blocks) * 2))

    row_y = content_top
    for num, lines, block_h in row_blocks:
        row_h  = block_h + row_pad * 2
        num_bb = draw.textbbox((0, 0), num, font=num_font)
        num_h  = num_bb[3] - num_bb[1]
        draw.text((MARGIN, row_y + (row_h - num_h) // 2), num, fill=(32,46,58), font=num_font)
        for li, line in enumerate(lines):
            draw.text((text_x, row_y + row_pad + li * line_h), line, fill=WHITE, font=text_font)
        row_y += row_h
        draw.line([(MARGIN, row_y), (W-MARGIN, row_y)], fill=(28,40,50), width=1)
        row_y += 2

    draw.line([(MARGIN, H-MARGIN-10), (W-MARGIN, H-MARGIN-10)], fill=(35,48,58), width=1)
    return img


# ── Slide 6: CTA ──────────────────────────────────────────────────────────────
def slide6(n, total):
    img = new_slide(TEAL)
    draw = ImageDraw.Draw(img)
    draw.line([(W-140,0),(W,140)], fill=TEAL_DARK2, width=3)
    draw.line([(W-70, 0),(W, 70)], fill=(8,95,85),  width=1)
    draw.line([(0,H-140),(140,H)], fill=TEAL_DARK2, width=2)

    rule_y = nav_bar(img, draw, n, total, on_teal=True)

    y = rule_y + 72
    draw.text((MARGIN, y),      'Need a website', fill=WHITE, font=ft(BOLD, 88))
    draw.text((MARGIN, y+96),   'that actually',  fill=WHITE, font=ft(BOLD, 88))
    draw.text((MARGIN, y+192),  'converts?',      fill=DARK,  font=ft(BOLD, 88))

    sub_y = y + 312
    draw.text((MARGIN, sub_y), "Let's build something you're proud of.",
              fill=TEAL_LIGHT, font=ft(REG, 26))

    bw, bh = 400, 72
    by = sub_y + 58
    draw.rounded_rectangle([MARGIN, by, MARGIN+bw, by+bh], radius=36, fill=DARK)
    btn = 'DM me to work together'
    bb = draw.textbbox((0,0), btn, font=ft(BOLD, 26))
    tw = bb[2]-bb[0]
    draw.text((MARGIN+(bw-tw)//2, by+22), btn, fill=WHITE, font=ft(BOLD, 26))

    draw.line([(MARGIN, H-MARGIN-36), (W-MARGIN, H-MARGIN-36)], fill=TEAL_DARK2, width=1)
    draw.text((MARGIN, H-MARGIN-20), 'wisdomlayers.com', fill=TEAL_LIGHT, font=ft(REG, 19))
    return img


# ── Build ─────────────────────────────────────────────────────────────────────
TOTAL = 6
slides = [
    slide1(1, TOTAL),
    slide_split(2, TOTAL),
    slide_shot(BEFORE_PATH, 'BEFORE', RED,   3, TOTAL, crop_pct=0.26, caption_text='pjpressurewash.com'),
    slide_shot(AFTER_PATH,  'AFTER',  GREEN, 4, TOTAL, crop_pct=0.30, caption_text='Rebuilt by WisdomLayers'),
    slide5(5, TOTAL),
    slide6(6, TOTAL),
]

print('Writing PDF...')
c = canvas.Canvas(OUT_PATH, pagesize=(1080, 1080))
for slide in slides:
    buf = io.BytesIO()
    slide.save(buf, format='PNG')
    buf.seek(0)
    c.drawImage(ImageReader(buf), 0, 0, 1080, 1080)
    c.showPage()
c.save()
print('Done:', OUT_PATH)
