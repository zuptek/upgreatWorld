import os
import json
import re

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

# 1. Read index.html to extract the new header and footer
index_content = read_file('index.html')

# Extract header and footer
header_split = index_content.split('</header>')
header = header_split[0] + '</header>'

footer_split = index_content.split('<!-- FOOTER -->')
footer = '<!-- FOOTER -->' + footer_split[1]

# Modify navigation links in header
header = header.replace('href="#services"', 'href="services.html"')
header = header.replace('href="#approach"', 'href="about.html"')
header = header.replace('href="#cities"', 'href="index.html#cities"')
header = header.replace('href="#contact"', 'href="contact.html"')

# Modify footer links
footer = footer.replace('href="#services"', 'href="services.html"')
footer = footer.replace('href="#approach"', 'href="about.html"')
footer = footer.replace('href="#cities"', 'href="index.html#cities"')
footer = footer.replace('href="#contact"', 'href="contact.html"')

def generate_page(filename, title, content, description=""):
    # Adjust title in header
    page_header = header.replace('<title>Outdoor, Transit & Experiential Advertising Agency | UpGreat World</title>', f'<title>{title}</title>')
    page_header = page_header.replace('<title>UpGreat World — Be unmissable in the real world</title>', f'<title>{title}</title>')
    
    # Inject meta description if provided
    if description:
        page_header = re.sub(
            r'<meta name="description" content=".*?">',
            f'<meta name="description" content="{description}">',
            page_header
        )
        
    # Inject canonical link tag
    page_header = page_header.replace(
        '<link rel="canonical" href="https://upgreatworld.com/">',
        f'<link rel="canonical" href="https://upgreatworld.com/{filename}">'
    )
        
    html = page_header + '\n' + content + '\n' + footer
    write_file(filename, html)
    print(f"Generated {filename}")

# --- CORE PAGES ---

# 1. About Page
about_content = """
<section class="inner-hero">
  <div class="wrap">
    <span class="sec-eyebrow reveal">About Us</span>
    <h1 class="reveal" data-d="1">One Group, Infinite Possibilities.</h1>
    <p class="reveal" data-d="2">UpGreat World is India’s premier full‑spectrum advertising agency and multi‑vertical business group operating across media, exhibitions, employment, and international trade.</p>
  </div>
</section>
<section class="inner-content wrap">
  <div class="grid-2">
    <div class="content-box reveal">
      <h3>Pan-India Scale</h3>
      <p>With 500+ successful campaigns executed across 20+ cities including Delhi‑NCR, Mumbai, Bangalore, Hyderabad, Chennai, Kolkata, Pune, and Ahmedabad.</p>
      <p>We provide large‑scale physical visibility for brands of "every size" — from local disruptors to national giants.</p>
    </div>
    <div class="content-box reveal" data-d="1">
      <h3>15+ Specialized Verticals</h3>
      <p>We bring outdoor, transit, BTL, DOOH, political PR, social media, exhibitions & trade shows, employment platforms, and international trade under one roof.</p>
      <p>We partner with marketing heads, brand managers, CMOs, founders, and political campaign teams in real estate, FMCG, retail, fintech, BFSI, healthcare, ecommerce, education, hospitality, and more.</p>
    </div>
  </div>
</section>
"""
generate_page('about.html', 'About Us | UpGreat World', about_content, "UpGreat World is India’s premier full‑spectrum advertising agency operating across media, exhibitions, and trade.")

# 2. Services Page
services_content = """
<section class="inner-hero">
  <div class="wrap">
    <span class="sec-eyebrow reveal">Our Verticals</span>
    <h1 class="reveal" data-d="1">15+ Specialized Services Under One Roof.</h1>
    <p class="reveal" data-d="2">Explore our core pillars of real-world visibility and brand dominance.</p>
  </div>
</section>
<section class="whatwedo">
  <div class="wrap">
    <div class="svc-grid" style="margin-top:0">
      <div class="svc-card reveal">
        <span class="svc-num">01</span>
        <div class="svc-ic"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="12" rx="1.5" stroke="currentColor" stroke-width="2"/><path d="M8 20h8M12 16v4" stroke="currentColor" stroke-width="2"/></svg></div>
        <h3>Outdoor Advertising</h3>
        <p>Hoardings, billboards, gantries and unipoles.</p>
        <a href="outdoor-advertising.html" class="link-txt" style="margin-top:16px">Learn more <span class="arw">→</span></a>
      </div>
      <div class="svc-card reveal" data-d="1">
        <span class="svc-num">02</span>
        <div class="svc-ic"><svg viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="20" height="10" rx="2" stroke="currentColor" stroke-width="2"/><circle cx="7" cy="19" r="1.8" stroke="currentColor" stroke-width="2"/><circle cx="17" cy="19" r="1.8" stroke="currentColor" stroke-width="2"/></svg></div>
        <h3>Transit Advertising</h3>
        <p>Buses, metros, cabs, and on‑the‑move inventory.</p>
        <a href="transit-advertising.html" class="link-txt" style="margin-top:16px">Learn more <span class="arw">→</span></a>
      </div>
      <div class="svc-card reveal" data-d="2">
        <span class="svc-num">03</span>
        <div class="svc-ic"><svg viewBox="0 0 24 24" fill="none"><path d="M4 20V8l8-4 8 4v12" stroke="currentColor" stroke-width="2"/><path d="M9 20v-6h6v6" stroke="currentColor" stroke-width="2"/></svg></div>
        <h3>BTL Marketing</h3>
        <p>Ground activations, canopies, mall promotions.</p>
        <a href="btl-marketing.html" class="link-txt" style="margin-top:16px">Learn more <span class="arw">→</span></a>
      </div>
      <div class="svc-card reveal">
        <span class="svc-num">04</span>
        <div class="svc-ic"><svg viewBox="0 0 24 24" fill="none"><path d="M12 21c5-4 8-7.5 8-11a8 8 0 1 0-16 0c0 3.5 3 7 8 11Z" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" stroke-width="2"/></svg></div>
        <h3>Hyperlocal</h3>
        <p>Neighbourhood-level targeting that meets audiences exactly where they live.</p>
        <a href="hyperlocal-marketing.html" class="link-txt" style="margin-top:16px">Learn more <span class="arw">→</span></a>
      </div>
      <div class="svc-card reveal" data-d="1">
        <span class="svc-num">05</span>
        <div class="svc-ic"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="13" rx="2" stroke="currentColor" stroke-width="2"/><path d="M8 21h8" stroke="currentColor" stroke-width="2"/><path d="M8 10l3 2-3 2M14 14h2" stroke="currentColor" stroke-width="2"/></svg></div>
        <h3>Digital OOH</h3>
        <p>Programmatic LED and digital screens with real-time creative.</p>
        <a href="digital-ooh.html" class="link-txt" style="margin-top:16px">Learn more <span class="arw">→</span></a>
      </div>
      <div class="svc-card reveal" data-d="2">
        <span class="svc-num">06</span>
        <div class="svc-ic"><svg viewBox="0 0 24 24" fill="none"><path d="M4 8h16M6 8l1.5 12h9L18 8M9 8V5h6v3" stroke="currentColor" stroke-width="2"/></svg></div>
        <h3>Event &amp; Exhibition</h3>
        <p>Stalls, stages and experiential builds for trade shows.</p>
        <a href="event-exhibition.html" class="link-txt" style="margin-top:16px">Learn more <span class="arw">→</span></a>
      </div>
      <div class="svc-card reveal">
        <span class="svc-num">07</span>
        <div class="svc-ic"><svg viewBox="0 0 24 24" fill="none"><path d="M3 9l9-6 9 6v11H3V9Z" stroke="currentColor" stroke-width="2"/><rect x="9" y="13" width="6" height="7" stroke="currentColor" stroke-width="2"/></svg></div>
        <h3>Retail Branding</h3>
        <p>In-store, façade and point-of-sale branding.</p>
        <a href="retail-branding.html" class="link-txt" style="margin-top:16px">Learn more <span class="arw">→</span></a>
      </div>
      <div class="svc-card reveal" data-d="1">
        <span class="svc-num">08</span>
        <div class="svc-ic"><svg viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2"/></svg></div>
        <h3>Political Campaigns</h3>
        <p>Strategic advertising and visibility for political campaigns.</p>
        <a href="political-advertising.html" class="link-txt" style="margin-top:16px">Learn more <span class="arw">→</span></a>
      </div>
    </div>
  </div>
</section>
"""
generate_page('services.html', 'Services | UpGreat World', services_content, "Discover our full-spectrum advertising services including Outdoor, Transit, BTL, DOOH, and more.")

# 3. Case Studies Page
cases_content = """
<section class="inner-hero">
  <div class="wrap">
    <span class="sec-eyebrow reveal">Case Studies</span>
    <h1 class="reveal" data-d="1">Proven Results in 20+ Cities.</h1>
    <p class="reveal" data-d="2">See how we build unmissable campaigns for real estate, FMCG, retail, and political clients across India.</p>
  </div>
</section>
<section class="inner-content wrap">
  <div class="grid-2">
    <div class="content-box reveal">
      <h3>National FMCG Product Launch</h3>
      <p><strong>Goal:</strong> Mass visibility across top 5 metros in 14 days.</p>
      <p><strong>Solution:</strong> A synchronized OOH + DOOH takeover combining 150+ hoardings and 80+ transit assets.</p>
      <p style="color:var(--green); font-weight: 500; font-family:var(--mono); margin-top: 16px;">18.5M Impressions | 4.3x Frequency</p>
    </div>
    <div class="content-box reveal" data-d="1">
      <h3>Real Estate Mega Project</h3>
      <p><strong>Goal:</strong> Hyperlocal dominance to drive footfalls to experience center.</p>
      <p><strong>Solution:</strong> Strategic unipoles and local BTL mall activations within a 15km radius of the property.</p>
      <p style="color:var(--green); font-weight: 500; font-family:var(--mono); margin-top: 16px;">300% ROI | Sold Out Phase 1</p>
    </div>
  </div>
</section>
"""
generate_page('case-studies.html', 'Case Studies | UpGreat World', cases_content, "Explore our advertising case studies showing proven real-world results across India.")

# 4. Contact Page
contact_content = """
<section class="inner-hero">
  <div class="wrap">
    <span class="sec-eyebrow reveal">Get in Touch</span>
    <h1 class="reveal" data-d="1">Plan Your Campaign.</h1>
    <p class="reveal" data-d="2">Tell us your market, audience and goal — we'll come back with a real-world plan that can't be scrolled past.</p>
  </div>
</section>
<section class="inner-content wrap">
  <div class="grid-2">
    <div class="content-box reveal">
      <form>
        <div class="form-group">
          <label>Name</label>
          <input type="text" placeholder="Jane Doe">
        </div>
        <div class="form-group">
          <label>Company</label>
          <input type="text" placeholder="Acme Corp">
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" placeholder="jane@example.com">
        </div>
        <div class="form-group">
          <label>Campaign Details</label>
          <textarea rows="4" placeholder="Tell us about your target cities and goals..."></textarea>
        </div>
        <button type="submit" class="btn btn-primary" style="border:none; cursor:pointer;">Submit Request <span class="arw">→</span></button>
      </form>
    </div>
    <div class="content-box reveal" data-d="1" style="background:var(--blue); color:#fff; border:none;">
      <h3 style="color:#fff;">Contact Details</h3>
      <p style="color:rgba(255,255,255,0.8);">Reach out to our pan-India team directly.</p>
      <br>
      <p style="color:#fff;"><strong>Email:</strong><br>hello@upgreatworld.com</p>
      <p style="color:#fff; margin-top: 16px;"><strong>Phone:</strong><br>+91 90886 55513</p>
      <p style="color:#fff; margin-top: 16px;"><strong>Headquarters:</strong><br>Welldone Tech Park, Sector 48, Gurugram – 122018</p>
    </div>
  </div>
</section>
"""
generate_page('contact.html', 'Contact Us | UpGreat World', contact_content, "Contact UpGreat World to start planning your custom physical advertising campaign.")


# --- DYNAMIC SUB-PAGES (FROM pages_data.json) ---

if os.path.exists('pages_data.json'):
    with open('pages_data.json', 'r', encoding='utf-8') as f:
        pages_data = json.load(f)
        
    for filename, p in pages_data.items():
        # Reconstruct the HTML body content from the JSON data
        body_html = f"""
<section class="inner-hero" style="background: linear-gradient(rgba(21, 21, 15, 0.7), rgba(21, 21, 15, 0.7)), url('{p['hero_bg']}'); background-size: cover; background-position: center; color: #fff;">
  <div class="wrap">
    <span class="sec-eyebrow reveal" style="color: rgba(255,255,255,0.75);">UpGreat World</span>
    <h1 class="reveal" data-d="1" style="color: #fff;">{p['hero_title']}</h1>
    <p class="reveal" data-d="2" style="color: rgba(255,255,255,0.9); max-width: 760px;">{p['hero_desc']}</p>
    <div class="reveal" data-d="3" style="margin-top: 32px;">
      <a href="contact.html" class="btn btn-primary">Get a Quote <span class="arw">→</span></a>
    </div>
  </div>
</section>

<section class="inner-content wrap">
  <div class="grid-2">
    <div class="content-box reveal">
      <h3>{p['seo_title']}</h3>
"""
        for para in p['paragraphs']:
            body_html += f"      <p>{para}</p>\n"
            
        body_html += """    </div>
    <div class="content-box reveal" data-d="1">
"""
        if p['points']:
            body_html += "      <h3>Key Highlights</h3>\n      <ul class=\"feat-list\">\n"
            for pt in p['points']:
                body_html += f"        <li><svg viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M20 6L9 17l-5-5\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>{pt}</li>\n"
            body_html += "      </ul>\n"
        else:
            body_html += """      <h3>Ready to dominate?</h3>
      <p>Book a high-impact campaign with India's premier advertising network today. We handle all planning, deployment, fabrication, and audits.</p>
      <a href="contact.html" class="btn btn-primary" style="margin-top: 16px;">Start a campaign <span class="arw">→</span></a>
"""
        body_html += """    </div>
  </div>
</section>
"""

        if p['cards']:
            body_html += f"""
<section class="inner-content" style="background: var(--warm); border-top: 1px solid var(--line-2); border-bottom: 1px solid var(--line-2);">
  <div class="wrap">
    <span class="sec-eyebrow reveal" style="display: block; text-align: center;">Advantages</span>
    <h2 class="sec-title reveal" data-d="1" style="text-align: center; margin-bottom: 48px;">Why Choose Us</h2>
    <div class="grid-3">
"""
            for i, card in enumerate(p['cards'][:3]):
                delay = f' data-d="{i}"' if i > 0 else ""
                body_html += f"""      <div class="content-box reveal"{delay}>
        <h3 style="font-size: 1.5rem; margin-bottom: 12px;">{card['title']}</h3>
        <p style="margin-bottom: 0;">{card['desc']}</p>
      </div>\n"""
            body_html += """    </div>
  </div>
</section>
"""

        if p['faqs']:
            body_html += """
<section class="inner-content wrap" style="max-width: 800px;">
  <span class="sec-eyebrow reveal" style="display: block; text-align: center;">FAQ</span>
  <h2 class="sec-title reveal" data-d="1" style="text-align: center; margin-bottom: 44px;">Frequently Asked Questions</h2>
  <div class="reveal" data-d="2" style="display: flex; flex-direction: column; gap: 16px;">
"""
            for faq in p['faqs']:
                body_html += f"""    <div class="content-box" style="padding: 24px; border-radius: 12px;">
      <h4 style="font-family: var(--serif); font-size: 1.25rem; font-weight: 500; margin-bottom: 8px;">{faq['q']}</h4>
      <p style="margin-bottom: 0; color: var(--ink-2); font-size: 15px;">{faq['a']}</p>
    </div>\n"""
            body_html += """  </div>
</section>
"""

        generate_page(filename, p['title'], body_html, p['description'])
        
        # Inject FAQ Schema if present
        if p['schema']:
            file_path = filename
            html = read_file(file_path)
            html = html.replace('</body>', f'<script type="application/ld+json">\n{p["schema"]}\n</script>\n</body>')
            write_file(file_path, html)

# Finally, update index.html to use the new HTML links
index_content = index_content.replace('href="#services"', 'href="services.html"')
index_content = index_content.replace('href="#approach"', 'href="about.html"')
index_content = index_content.replace('href="#contact"', 'href="contact.html"')
write_file('index.html', index_content)

# Generate sitemap.html
sitemap_html_content = """
<section class="inner-hero">
  <div class="wrap">
    <span class="sec-eyebrow reveal">Navigation Portal</span>
    <h1 class="reveal" data-d="1">Website Sitemap</h1>
    <p class="reveal" data-d="2">A comprehensive directory of all services, campaign formats, coverage cities, and institutional pages of UpGreat World.</p>
  </div>
</section>
<section class="inner-content wrap reveal" data-d="3">
  <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:3rem; margin-bottom:4rem;">
    <div>
      <h3 style="border-bottom: 2px solid var(--line); padding-bottom: 12px; margin-bottom: 20px;">Corporate Portal</h3>
      <a href="index.html" style="display:block; margin-bottom:12px; font-size:1.1rem; color:var(--ink-2); text-decoration:none;">Home Page</a>
      <a href="about.html" style="display:block; margin-bottom:12px; font-size:1.1rem; color:var(--ink-2); text-decoration:none;">About UpGreat World</a>
      <a href="services.html" style="display:block; margin-bottom:12px; font-size:1.1rem; color:var(--ink-2); text-decoration:none;">All Services Overview</a>
      <a href="case-studies.html" style="display:block; margin-bottom:12px; font-size:1.1rem; color:var(--ink-2); text-decoration:none;">Success Stories &amp; Case Studies</a>
      <a href="cities.html" style="display:block; margin-bottom:12px; font-size:1.1rem; color:var(--ink-2); text-decoration:none;">National Footprint &amp; Cities</a>
      <a href="campaign.html" style="display:block; margin-bottom:12px; font-size:1.1rem; color:var(--ink-2); text-decoration:none;">Plan a Campaign</a>
      <a href="contact.html" style="display:block; margin-bottom:12px; font-size:1.1rem; color:var(--ink-2); text-decoration:none;">Contact Us</a>
    </div>
    <div>
      <h3 style="border-bottom: 2px solid var(--line); padding-bottom: 12px; margin-bottom: 20px;">Media Services</h3>
      <a href="outdoor-advertising.html" style="display:block; margin-bottom:12px; font-size:1.1rem; color:var(--ink-2); text-decoration:none;">Outdoor Hoardings &amp; Billboards</a>
      <a href="transit-advertising.html" style="display:block; margin-bottom:12px; font-size:1.1rem; color:var(--ink-2); text-decoration:none;">Transit &amp; Vehicle Branding</a>
      <a href="btl-marketing.html" style="display:block; margin-bottom:12px; font-size:1.1rem; color:var(--ink-2); text-decoration:none;">BTL Marketing &amp; Ground Activations</a>
      <a href="digital-ooh.html" style="display:block; margin-bottom:12px; font-size:1.1rem; color:var(--ink-2); text-decoration:none;">Digital Out-of-Home (DOOH)</a>
      <a href="hyperlocal-marketing.html" style="display:block; margin-bottom:12px; font-size:1.1rem; color:var(--ink-2); text-decoration:none;">Hyperlocal Targeted Marketing</a>
      <a href="mall-multiplex-advertising.html" style="display:block; margin-bottom:12px; font-size:1.1rem; color:var(--ink-2); text-decoration:none;">Mall &amp; Multiplex Branding</a>
    </div>
    <div>
      <h3 style="border-bottom: 2px solid var(--line); padding-bottom: 12px; margin-bottom: 20px;">Production &amp; Strategy</h3>
      <a href="event-exhibition.html" style="display:block; margin-bottom:12px; font-size:1.1rem; color:var(--ink-2); text-decoration:none;">Events &amp; Exhibitions Management</a>
      <a href="experiential-marketing.html" style="display:block; margin-bottom:12px; font-size:1.1rem; color:var(--ink-2); text-decoration:none;">Experiential Ads &amp; Brand Activation</a>
      <a href="branding-production.html" style="display:block; margin-bottom:12px; font-size:1.1rem; color:var(--ink-2); text-decoration:none;">Branding Fabrication &amp; Production</a>
      <a href="corporate-office-branding.html" style="display:block; margin-bottom:12px; font-size:1.1rem; color:var(--ink-2); text-decoration:none;">Corporate Signage &amp; Office Branding</a>
      <a href="retail-branding.html" style="display:block; margin-bottom:12px; font-size:1.1rem; color:var(--ink-2); text-decoration:none;">Retail Facades &amp; POS Branding</a>
      <a href="political-advertising.html" style="display:block; margin-bottom:12px; font-size:1.1rem; color:var(--ink-2); text-decoration:none;">Political Visibility Campaigns</a>
      <a href="print-advertising.html" style="display:block; margin-bottom:12px; font-size:1.1rem; color:var(--ink-2); text-decoration:none;">Print Media &amp; Large Format Printing</a>
      <a href="media-planning.html" style="display:block; margin-bottom:12px; font-size:1.1rem; color:var(--ink-2); text-decoration:none;">Media Strategy &amp; Campaign Planning</a>
    </div>
  </div>
</section>
"""
generate_page('sitemap.html', 'HTML Sitemap | Directory of Pages | UpGreat World', sitemap_html_content, "Explore the sitemap directory of UpGreat World for easy navigation of all our outdoor advertising, transit, and BTL marketing pages.")

# Generate sitemap.xml
xml_pages = [
    ('', 1.0, 'daily'),
    ('about.html', 0.8, 'monthly'),
    ('services.html', 0.8, 'weekly'),
    ('case-studies.html', 0.8, 'weekly'),
    ('cities.html', 0.8, 'weekly'),
    ('campaign.html', 0.8, 'monthly'),
    ('contact.html', 0.8, 'monthly'),
    ('sitemap.html', 0.5, 'monthly'),
]

# Load dynamic pages
if os.path.exists('pages_data.json'):
    with open('pages_data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        for page in data.keys():
            xml_pages.append((page, 0.6, 'weekly'))

xml_content = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
for page, priority, freq in xml_pages:
    url = f"https://upgreatworld.com/{page}"
    xml_content += f"""  <url>
    <loc>{url}</loc>
    <changefreq>{freq}</changefreq>
    <priority>{priority:.1f}</priority>
  </url>\n"""
xml_content += '</urlset>\n'
write_file('sitemap.xml', xml_content)
print("Generated sitemap.xml")

print("Site generation complete.")
