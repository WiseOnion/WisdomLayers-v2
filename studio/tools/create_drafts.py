"""
WisdomLayers — Gmail Draft Creator
Creates personalized cold email drafts for far leads.
DOES NOT SEND ANYTHING. Drafts only.

Usage:
  python create_drafts.py

First run will open a browser for Gmail OAuth login.
After that it saves a token so you don't have to log in again.
"""

import os
import re
import base64
from email.mime.text import MIMEText
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

# ── Config ────────────────────────────────────────────────────────────────────

SENDER_NAME = "Wisdom Johnson"
SENDER_EMAIL = "contact@wisdomlayers.com"
CREDENTIALS_FILE = "credentials.json"
TOKEN_FILE = "token.json"
SCOPES = ["https://www.googleapis.com/auth/gmail.compose"]

# ── Hand-written emails for each lead ────────────────────────────────────────
# Key = business name (must match leads.html exactly)

EMAILS = {

"For His Glory Cleaning Services": {
    "subject": "Quick question about your online presence",
    "body": """Hey,

I came across For His Glory Cleaning Services on Facebook while searching for cleaning companies in the Goldsboro area. You've got a solid reputation — licensed, insured, handling both residential and commercial. The only thing I couldn't find was a website.

My name is Wisdom Johnson. I'm a high school student and I started a web design agency called WisdomLayers to help pay for college. A few of us on the team are doing the same thing — building real skills and a real business while we're still in school. Because of that, our prices are way lower than what you'd pay a traditional agency.

For a cleaning company like yours, a website means homeowners in Goldsboro searching "cleaning service near me" on Google can actually find you — not just the people who already follow your Facebook page. Right now that's a lot of business going to someone else.

We build clean, fast, professional sites — no templates, no cookie-cutter layouts. I'd love to show you a couple examples and see if it makes sense for your business.

Would you be open to a quick 10-minute call or just reply here?

— Wisdom Johnson
WisdomLayers
contact@wisdomlayers.com
wisdomlayers.com"""
},

"BASS HVAC": {
    "subject": "Helping BASS HVAC get found on Google",
    "body": """Hey,

I was looking up HVAC companies in the Kinston area and came across BASS HVAC on Facebook. Licensed, insured, solid operation — but no website. That surprised me for a business doing the kind of work you do.

My name is Wisdom Johnson. I run WisdomLayers, a small web design agency. I started it in high school to help pay for college — a few of us on the team are in the same boat. Because we're young and building our portfolio, we charge a fraction of what a big agency would.

Here's the thing about HVAC — when someone's AC goes out in July, they're not scrolling Facebook. They're Googling "HVAC repair Kinston NC" and calling whoever shows up first. Right now that's not you, and it's costing you jobs.

A website from us would get you on Google, show your licensing, list your services, and make it easy for people to call or contact you directly. That's it — nothing complicated.

Can I send you a couple examples? Just want to show you what it would look like for BASS HVAC.

— Wisdom Johnson
WisdomLayers
contact@wisdomlayers.com
wisdomlayers.com"""
},

"PM Heating & Air Conditioning LLC": {
    "subject": "PM Heating & Air — quick question",
    "body": """Hey,

I found PM Heating & Air Conditioning on Facebook while searching for HVAC companies in Kinston. Year-round heating and cooling repair, solid reviews — but no real website to speak of.

I'm Wisdom Johnson. I started a web design company called WisdomLayers while I'm still in high school — the goal is to earn money for college doing something I'm actually good at. A couple of my teammates are doing the same. We keep our prices low because we're building our reputation, and we put real work into every project.

For an HVAC company, a website is how you capture the people who are searching right now — not the ones who already know you. Someone new to Kinston has no idea PM Heating & Air exists. A Google-ready website changes that overnight.

I'd love to put together a quick mockup and show you what it could look like. No commitment, just want to show you the vision.

Open to a quick call or reply back here?

— Wisdom Johnson
WisdomLayers
contact@wisdomlayers.com
wisdomlayers.com"""
},

"Alvarez Painting": {
    "subject": "Getting Alvarez Painting more customers online",
    "body": """Hey,

I came across Alvarez Painting on Facebook — you cover Lee and Moore counties, which is a solid service area. But when I searched for painters in Sanford on Google, I couldn't find you anywhere.

My name is Wisdom Johnson. I'm a high school student who started a web design company called WisdomLayers to pay for college. A few of us on the team are doing the same thing — real work, real skills, while we're still in school. Our prices reflect that — nowhere near what a traditional agency charges.

For a painting company, a website is how homeowners who don't know you yet can find you. People search "painter in Sanford NC" or "exterior painting Lee County" before they call anyone. Right now those searches aren't leading to you.

We'd build you something clean and professional — your services, your service area, photos of your work, and a way for people to contact you directly. Simple and effective.

Can I shoot you a couple examples? Just want to show you what it could look like.

— Wisdom Johnson
WisdomLayers
contact@wisdomlayers.com
wisdomlayers.com"""
},

"Kate's Cleaning +": {
    "subject": "Quick question about Kate's Cleaning +",
    "body": """Hey,

I found Kate's Cleaning + on Facebook while looking up cleaning services in Burlington. Looks like a solid, personal operation — but there's no website, which means people searching on Google can't find you.

I'm Wisdom Johnson — I run WisdomLayers, a web design agency I started in high school to help pay for college. A few of us on the team are in the same situation. We genuinely love what we do, and because we're young and building our portfolio, we price our work way below market.

Cleaning is one of those businesses where trust matters a lot. A good website gives you credibility before someone even picks up the phone — it shows your services, your pricing range, maybe some reviews, and a way to book or reach out. That's what turns a Google search into a real customer for Kate's Cleaning +.

I'd love to put together something quick and show you what it could look like. No pressure at all.

Would you be open to chatting for 10 minutes?

— Wisdom Johnson
WisdomLayers
contact@wisdomlayers.com
wisdomlayers.com"""
},

"Blue Luna Tattoo Co": {
    "subject": "Blue Luna Tattoo — quick question about your website",
    "body": """Hey,

I was searching for tattoo studios in the Asheboro area and came across Blue Luna Tattoo Co on Facebook. The work looks really clean — but there's no website. For a tattoo studio, that's a real missed opportunity.

My name is Wisdom Johnson. I started WisdomLayers, a web design agency, while I'm still in high school — the whole point is to fund college doing something I actually care about. A few of us on the team are doing the same. Because we're young and building our portfolio, we keep our prices low and put real effort into every single project.

For a tattoo studio, your website is your portfolio. It's how someone new to Asheboro — or someone who's been here forever but just got inspired to get their first tattoo — finds you when they Google "tattoo shop Asheboro." Right now they're finding whoever has a website first.

I'd love to design something that actually shows off the quality of your work. Not a basic template — something that feels like Blue Luna.

Can I send you a mockup? No strings attached.

— Wisdom Johnson
WisdomLayers
contact@wisdomlayers.com
wisdomlayers.com"""
},

"J&A Towing": {
    "subject": "Helping J&A Towing show up when people need you most",
    "body": """Hey,

I came across J&A Towing while searching for towing companies in the Wilson area. You've got a solid operation — but no website. For towing that's a big deal, because the people who need you most are usually searching in a panic.

I'm Wisdom Johnson. I run WisdomLayers — I started it in high school to earn money for college. A couple teammates of mine are in the same situation. We build real, professional websites at prices that actually make sense for small businesses, not agency rates.

Think about it this way: someone breaks down on US-301 at 11pm and Googles "towing near Wilson NC." They're calling whoever shows up in that search. Right now, that's not J&A Towing. A website changes that — and for a 24-hour service, it can mean a lot of extra calls.

We'd keep it simple: your services, your coverage area, your number front and center, and the SEO to get you found. That's it.

Would you be open to seeing what that would look like?

— Wisdom Johnson
WisdomLayers
contact@wisdomlayers.com
wisdomlayers.com"""
},

"DJ Renaldo Creative": {
    "subject": "Getting DJ Renaldo Creative more bookings online",
    "body": """Hey Renaldo,

I found DJ Renaldo Creative on Facebook while searching for DJs in Greenville. Weddings, birthdays, events, graduations — you've got the range. But when someone Googles "DJ in Greenville NC," you're not showing up.

My name is Wisdom Johnson. I'm a high school student who started a web design company called WisdomLayers — the goal is to make enough to pay for college doing work I'm actually proud of. A few people on my team are doing the same thing. Our prices are low because we're building our reputation, but we treat every project like it matters.

For a DJ, a website is your booking engine. It's where people land, hear your vibe, see your packages, and reach out. Right now anyone who doesn't already follow you on Facebook has no way to find you or book you. That's events going to someone else.

I'd build you something that actually fits your brand — not a boring template. Something that makes people want to book you before they even finish the page.

Can I send you a couple examples? Love to show you what I'm thinking.

— Wisdom Johnson
WisdomLayers
contact@wisdomlayers.com
wisdomlayers.com"""
},

"ARTIS DAILY BREAD Catering": {
    "subject": "Quick question about ARTIS DAILY BREAD's online presence",
    "body": """Hey,

I came across ARTIS DAILY BREAD on Facebook while searching for catering companies in Goldsboro. Great concept — but there's no website, and that means anyone searching for a caterer on Google is finding someone else.

I'm Wisdom Johnson. I started WisdomLayers — a web design agency — while I'm still in high school. The whole reason I started it is to save money for college. A few of my teammates are in the same position. We work hard because this actually matters to us, and our prices reflect that we're young and building our name.

For catering, a website is where people plan. They want to see your menu, your event experience, how to get in touch, and why they should choose you over everyone else. Right now that information lives on a Facebook page that people stumble across — or don't. A website puts you in front of people who are actively looking.

I'd love to put together something that shows the full story of what ARTIS DAILY BREAD is about. Can I shoot you over a couple examples?

— Wisdom Johnson
WisdomLayers
contact@wisdomlayers.com
wisdomlayers.com"""
},

"De'sheray Hair Salon": {
    "subject": "Quick question about De'sheray Hair Salon's website",
    "body": """Hey,

I was searching for hair salons in Kinston and came across De'sheray Hair Salon on Facebook. Really beautiful work — but no website. Anyone searching for a salon on Google right now can't find you.

My name is Wisdom Johnson. I run WisdomLayers, a web design agency I started in high school to help pay for college. A few of us on the team are doing the same — we're young, we're hungry, and we genuinely care about the work we put out. Our prices are low because we're building our portfolio, not because we cut corners.

For a salon, a website is where new clients make up their mind. They want to see your work, your vibe, your prices, and how to book. Right now, if someone moves to Kinston and searches "natural hair salon" or "best salon in Kinston NC," they're not finding De'sheray — they're finding whoever has a website.

I'd love to build you something that really reflects the quality of your work. Can I send you a couple examples to look at?

— Wisdom Johnson
WisdomLayers
contact@wisdomlayers.com
wisdomlayers.com"""
},

"Denny's Tax & Accounting": {
    "subject": "Helping Denny's Tax & Accounting get found online",
    "body": """Hey,

I found Denny's Tax & Accounting on Facebook while searching for tax preparation services in Rocky Mount. Solid, established operation — but no website. For a business that people actively search for every year around tax season, that's real money left on the table.

I'm Wisdom Johnson. I started WisdomLayers in high school to earn money for college. A few of my teammates are doing the same thing — we started a real business because we needed a real way to fund our education. That means we charge fair prices and actually deliver.

When someone in Rocky Mount searches "tax preparer near me" in January or February, they're ready to hire someone right then. A website means you show up in that search. It doesn't have to be complicated — your services, your experience, your contact info, and enough trust-building that they pick up the phone and call you.

Can I put together a quick mockup and show you what it could look like? No commitment needed.

— Wisdom Johnson
WisdomLayers
contact@wisdomlayers.com
wisdomlayers.com"""
},

"Elevate Fitness": {
    "subject": "Helping Elevate Fitness grow online",
    "body": """Hey,

I came across Elevate Fitness on Facebook while searching for gyms in Kannapolis — functional fitness, body pump, yoga — a really well-rounded offering. But there's no website, which means people searching on Google for a gym in Kannapolis can't find you.

My name is Wisdom Johnson. I run WisdomLayers — I started it while still in high school to save money for college. A couple teammates are in the same boat. We build professional websites at prices a small fitness studio can actually afford, because we're not a big agency trying to charge big agency rates.

For a gym, a website is your front door. New residents, people tired of their current gym, college students — they all search Google before they visit anywhere. A clean site with your classes, your schedule, your location, and some photos of the space is what turns a search into a new member.

I'd love to show you what we could put together for Elevate. Can I send you a couple examples?

— Wisdom Johnson
WisdomLayers
contact@wisdomlayers.com
wisdomlayers.com"""
},

"Glam Mode Boutique": {
    "subject": "Quick question about Glam Mode Boutique's website",
    "body": """Hey,

I found Glam Mode Boutique on Facebook while looking up women's boutiques in Goldsboro. Great selection — apparel, accessories, the whole vibe is there. But there's no website, which means online shoppers and people searching Google can't find you.

I'm Wisdom Johnson. I started WisdomLayers in high school — me and a few teammates are building this company to pay for college. We're not doing this as a side hobby, it's how we're funding our future. Because of that, we price our work fairly and put real effort into every project.

For a boutique, a website opens up an entirely new customer base. People who've never walked into your store can find you, browse what you have, and either shop online or come in. Even if you don't do e-commerce, a website with your inventory, your location, and your hours is how you stop being invisible to everyone who shops online first.

I'd love to put together something that matches Glam Mode's energy. Can I send over a couple examples?

— Wisdom Johnson
WisdomLayers
contact@wisdomlayers.com
wisdomlayers.com"""
},

"Jacqueline's Boutique": {
    "subject": "27 years of business — you deserve a real website",
    "body": """Hey,

I came across Jacqueline's Boutique while searching for boutiques in Gastonia. 27 years in business — that is genuinely impressive. That kind of history and community trust is exactly what a website should be telling the world. And right now, it's not, because there's no website.

My name is Wisdom Johnson. I run WisdomLayers, a web design company I started in high school to help pay for college. Me and a couple of my teammates started this because we needed a real way to fund our education — so we built something real. We price our work low because we're building our reputation, but 27 years of business deserves real work, and that's what we deliver.

A boutique that's been around since before some of your customers were born has a story. That story, combined with your current inventory and a way for people to find you online, is a powerful thing. Right now anyone in Gastonia searching for a boutique on Google isn't finding Jacqueline's — they're finding someone who's been open two years but has a website.

I'd love to change that. Can I send you a couple examples and set up a quick call?

— Wisdom Johnson
WisdomLayers
contact@wisdomlayers.com
wisdomlayers.com"""
},

"Look at Dat Der Soul Food & Social House": {
    "subject": "Getting Look at Dat Der found online",
    "body": """Hey,

I found Look at Dat Der Soul Food & Social House on Facebook while searching for soul food restaurants in Greenville. The vibe, the food, the catering — it's all there. But there's no website, and that means people searching on Google are missing out on you completely.

I'm Wisdom Johnson. I run WisdomLayers — started it in high school to earn money for college. A few teammates are doing the same. We're not a big agency, we're a small team of young people who actually care about the businesses we work with. Our prices are honest and fair.

For a restaurant that also does catering, a website does double duty. It shows your menu, your hours, your location — and it captures event and catering inquiries from people who'd never find you on Facebook. That's two revenue streams getting more exposure.

I'd love to build something that matches the energy of Look at Dat Der. Can I send you a couple examples?

— Wisdom Johnson
WisdomLayers
contact@wisdomlayers.com
wisdomlayers.com"""
},

"Ritual Beauty LLC": {
    "subject": "Helping Ritual Beauty get found on Google",
    "body": """Hey,

I found Ritual Beauty LLC on Facebook while searching for lash artists in Concord. Licensed esthetician, lash extensions, waxing — really clean, professional work. But there's no website, so anyone searching Google for lash services in Concord isn't finding you.

My name is Wisdom Johnson. I started WisdomLayers in high school to fund college — a couple of my teammates are doing the same thing. We build websites for small businesses at prices that actually make sense, because we're not trying to act like a big agency. We're just trying to do great work and earn our way.

For a lash and beauty business, a website is where new clients decide to book. They want to see your work, your pricing, what makes you different, and an easy way to reach out. Right now the only people booking you are people who already follow you. A website opens the door to everyone searching right now.

I'd love to show you what Ritual Beauty's website could look like. Can I send over some examples?

— Wisdom Johnson
WisdomLayers
contact@wisdomlayers.com
wisdomlayers.com"""
},

"Waggin' Tailz Doggie Daycare & Grooming": {
    "subject": "Quick question about Waggin' Tailz's website",
    "body": """Hey,

I came across Waggin' Tailz Doggie Daycare & Grooming on Facebook while searching for pet grooming and boarding in Wilson. Grooming, daycare, boarding — you've got a full operation. But there's no website, and pet owners searching on Google can't find you.

I'm Wisdom Johnson. I run WisdomLayers — I started it in high school because I needed a real way to pay for college. A few people on my team are in the same situation. We build professional, good-looking websites at prices a small local business can actually afford.

Pet owners are some of the most active searchers online. When someone moves to Wilson with a dog and searches "dog grooming near me" or "doggy daycare Wilson NC," they're ready to book right then. A website with your services, your hours, some photos of the facility, and a way to contact you is what converts that search into a new client.

Can I put together a quick mockup and send it over? No commitment — just want to show you what it could look like.

— Wisdom Johnson
WisdomLayers
contact@wisdomlayers.com
wisdomlayers.com"""
},

}  # end EMAILS dict


# ── Parse leads from leads.html ───────────────────────────────────────────────

def parse_leads(html_file):
    with open(html_file, "r", encoding="utf-8") as f:
        content = f.read()

    pattern = re.compile(
        r'\{\s*name:\s*"([^"]+)".*?category:\s*"([^"]+)".*?phone:\s*"([^"]*)".*?address:\s*"([^"]*)".*?notes:\s*"([^"]*)"\s*\}',
        re.DOTALL
    )

    leads = []
    for m in pattern.finditer(content):
        name, category, phone, address, notes = m.groups()
        if name not in EMAILS:
            continue
        email_match = re.search(r'[Ee]mail:\s*([\w.\-+]+@[\w.\-]+\.[a-zA-Z]{2,})', notes)
        if not email_match:
            continue
        leads.append({
            "name": name,
            "email": email_match.group(1),
        })

    return leads


# ── Gmail auth ────────────────────────────────────────────────────────────────

def get_gmail_service():
    creds = None
    if os.path.exists(TOKEN_FILE):
        creds = Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(CREDENTIALS_FILE, SCOPES)
            creds = flow.run_local_server(port=0)
        with open(TOKEN_FILE, "w") as token:
            token.write(creds.to_json())

    return build("gmail", "v1", credentials=creds)


# ── Create a single draft ─────────────────────────────────────────────────────

def create_draft(service, to_email, subject, body):
    message = MIMEText(body)
    message["to"] = to_email
    message["from"] = f"{SENDER_NAME} <{SENDER_EMAIL}>"
    message["subject"] = subject

    raw = base64.urlsafe_b64encode(message.as_bytes()).decode()
    draft = service.users().drafts().create(
        userId="me",
        body={"message": {"raw": raw}}
    ).execute()
    return draft["id"]


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    leads_file = os.path.join(script_dir, "leads.html")

    print("Parsing leads...")
    leads = parse_leads(leads_file)

    if not leads:
        print("No matching leads with emails found.")
        return

    print(f"Found {len(leads)} lead(s) with personalized emails ready:")
    for l in leads:
        print(f"  - {l['name']} -> {l['email']}")

    print("\nConnecting to Gmail...")
    service = get_gmail_service()

    created = 0
    for lead in leads:
        email_data = EMAILS[lead["name"]]
        draft_id = create_draft(service, lead["email"], email_data["subject"], email_data["body"])
        print(f"  OK Draft created for {lead['name']} -> {lead['email']} (ID: {draft_id})")
        created += 1

    print(f"\nDone. {created} draft(s) saved in wisdomlayers.team@gmail.com")
    print("Go to Gmail → Drafts to review before sending anything.")


if __name__ == "__main__":
    main()
