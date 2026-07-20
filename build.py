import os

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

index_content = read_file('index.html')

# Extract header and footer
# The header ends after </header>
header_split = index_content.split('</header>')
header = header_split[0] + '</header>'

# The footer starts before <!-- FOOTER -->
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

def generate_page(filename, title, content):
    # Adjust title in header
    page_header = header.replace('<title>Outdoor, Transit & Experiential Advertising Agency | UpGreat World</title>', f'<title>{title} | UpGreat World</title>')
    page_header = page_header.replace('<title>UpGreat World — Be unmissable in the real world</title>', f'<title>{title} | UpGreat World</title>')
    html = page_header + '\n' + content + '\n' + footer
    write_file(filename, html)

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
generate_page('about.html', 'About Us', about_content)

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
        <a href="service-ooh.html" class="link-txt" style="margin-top:16px">Learn more <span class="arw">→</span></a>
      </div>
      <div class="svc-card reveal" data-d="1">
        <span class="svc-num">02</span>
        <div class="svc-ic"><svg viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="20" height="10" rx="2" stroke="currentColor" stroke-width="2"/><circle cx="7" cy="19" r="1.8" stroke="currentColor" stroke-width="2"/><circle cx="17" cy="19" r="1.8" stroke="currentColor" stroke-width="2"/></svg></div>
        <h3>Transit Advertising</h3>
        <p>Buses, metros, cabs, and on‑the‑move inventory.</p>
        <a href="service-transit.html" class="link-txt" style="margin-top:16px">Learn more <span class="arw">→</span></a>
      </div>
      <div class="svc-card reveal" data-d="2">
        <span class="svc-num">03</span>
        <div class="svc-ic"><svg viewBox="0 0 24 24" fill="none"><path d="M4 20V8l8-4 8 4v12" stroke="currentColor" stroke-width="2"/><path d="M9 20v-6h6v6" stroke="currentColor" stroke-width="2"/></svg></div>
        <h3>BTL Marketing</h3>
        <p>Ground activations, canopies, mall promotions.</p>
        <a href="service-btl.html" class="link-txt" style="margin-top:16px">Learn more <span class="arw">→</span></a>
      </div>
      <div class="svc-card reveal">
        <span class="svc-num">04</span>
        <div class="svc-ic"><svg viewBox="0 0 24 24" fill="none"><path d="M12 21c5-4 8-7.5 8-11a8 8 0 1 0-16 0c0 3.5 3 7 8 11Z" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" stroke-width="2"/></svg></div>
        <h3>Hyperlocal</h3>
        <p>Neighbourhood-level targeting that meets audiences exactly where they live.</p>
        <a href="service-hyperlocal.html" class="link-txt" style="margin-top:16px">Learn more <span class="arw">→</span></a>
      </div>
      <div class="svc-card reveal" data-d="1">
        <span class="svc-num">05</span>
        <div class="svc-ic"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="13" rx="2" stroke="currentColor" stroke-width="2"/><path d="M8 21h8" stroke="currentColor" stroke-width="2"/><path d="M8 10l3 2-3 2M14 14h2" stroke="currentColor" stroke-width="2"/></svg></div>
        <h3>Digital OOH</h3>
        <p>Programmatic LED and digital screens with real-time creative.</p>
        <a href="service-dooh.html" class="link-txt" style="margin-top:16px">Learn more <span class="arw">→</span></a>
      </div>
      <div class="svc-card reveal" data-d="2">
        <span class="svc-num">06</span>
        <div class="svc-ic"><svg viewBox="0 0 24 24" fill="none"><path d="M4 8h16M6 8l1.5 12h9L18 8M9 8V5h6v3" stroke="currentColor" stroke-width="2"/></svg></div>
        <h3>Event &amp; Exhibition</h3>
        <p>Stalls, stages and experiential builds for trade shows.</p>
        <a href="service-experiential.html" class="link-txt" style="margin-top:16px">Learn more <span class="arw">→</span></a>
      </div>
      <div class="svc-card reveal">
        <span class="svc-num">07</span>
        <div class="svc-ic"><svg viewBox="0 0 24 24" fill="none"><path d="M3 9l9-6 9 6v11H3V9Z" stroke="currentColor" stroke-width="2"/><rect x="9" y="13" width="6" height="7" stroke="currentColor" stroke-width="2"/></svg></div>
        <h3>Retail Branding</h3>
        <p>In-store, façade and point-of-sale branding.</p>
        <a href="service-retail.html" class="link-txt" style="margin-top:16px">Learn more <span class="arw">→</span></a>
      </div>
      <div class="svc-card reveal" data-d="1">
        <span class="svc-num">08</span>
        <div class="svc-ic"><svg viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2"/></svg></div>
        <h3>Political Campaigns</h3>
        <p>Strategic advertising and visibility for political campaigns.</p>
        <a href="service-political.html" class="link-txt" style="margin-top:16px">Learn more <span class="arw">→</span></a>
      </div>
    </div>
  </div>
</section>
"""
generate_page('services.html', 'Services', services_content)

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
generate_page('case-studies.html', 'Case Studies', cases_content)

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
      <p style="color:#fff; margin-top: 16px;"><strong>Phone:</strong><br>+91 00000 00000</p>
      <p style="color:#fff; margin-top: 16px;"><strong>Headquarters:</strong><br>Delhi NCR, India</p>
    </div>
  </div>
</section>
"""
generate_page('contact.html', 'Contact Us', contact_content)

# Define service pages templates
services_data = [
    {
        'id': 'ooh',
        'title': 'Outdoor Advertising',
        'desc': 'Dominate the highest-traffic corridors of every market with our premium OOH inventory.',
        'points': ['Large-format hoardings & billboards', 'Strategic gantries on major highways', 'High-impact unipoles', 'Geo-tagged & time-stamped proof of display']
    },
    {
        'id': 'transit',
        'title': 'Transit Advertising',
        'desc': 'Carry your message wherever the city moves. Unmissable branding on-the-go.',
        'points': ['Full bus wraps & interior branding', 'Metro train wrapping & pillar branding', 'Auto-rickshaw & cab network advertising', 'Railway station branding']
    },
    {
        'id': 'btl',
        'title': 'BTL Marketing',
        'desc': 'On-ground activations that start real conversations and generate direct leads.',
        'points': ['Mall promotions & kiosk activations', 'Canopy setups in high-footfall areas', 'Door-to-door print distribution', 'Interactive ground-level marketing']
    },
    {
        'id': 'dooh',
        'title': 'Digital OOH',
        'desc': 'Programmatic LED screens with real-time, day-parted creative control.',
        'points': ['Pan-India premium digital screen network', 'Real-time campaign updates', 'Dynamic, weather & time-triggered creatives', 'High-brightness displays in prime locations']
    },
    {
        'id': 'experiential',
        'title': 'Event & Exhibition',
        'desc': 'Brand experiences and exhibitions that turn footfall into memory.',
        'points': ['Custom stall & stage fabrication', 'Trade-show presence & management', 'Immersive experiential setups', 'Complete end-to-end event execution']
    },
    {
        'id': 'political',
        'title': 'Political Campaigns',
        'desc': 'Large-scale visibility and PR strategies for political dominance.',
        'points': ['Multi-city political OOH dominance', 'Rally & on-ground activation management', 'Political PR & reputation management', 'Hyperlocal voter targeting']
    },
    {
        'id': 'retail',
        'title': 'Retail Branding',
        'desc': 'Close the loop right at the moment of purchase with in-store & point-of-sale branding.',
        'points': ['Store façade & signage fabrication', 'In-store merchandising displays', 'Point-of-sale branding', 'Retail network rollout management']
    },
    {
        'id': 'hyperlocal',
        'title': 'Hyperlocal Targeting',
        'desc': 'Meet audiences exactly where they live, shop, and commute.',
        'points': ['Neighbourhood-level asset mapping', 'RWAs & residential society branding', 'Targeted street-furniture advertising', 'Community-centric visibility plans']
    }
]

for s in services_data:
    points_html = ''.join([f'<li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2"/></svg>{p}</li>' for p in s['points']])
    content = f"""
    <section class="inner-hero">
      <div class="wrap">
        <span class="sec-eyebrow reveal">Service</span>
        <h1 class="reveal" data-d="1">{s['title']}</h1>
        <p class="reveal" data-d="2">{s['desc']}</p>
      </div>
    </section>
    <section class="inner-content wrap">
      <div class="grid-2">
        <div class="content-box reveal">
          <h3>What we offer</h3>
          <ul class="feat-list">
            {points_html}
          </ul>
        </div>
        <div class="content-box reveal" data-d="1" style="background:var(--warm); border:none;">
          <h3>Ready to dominate?</h3>
          <p>Book a campaign and get verified execution backed by our nationwide footprint.</p>
          <a href="contact.html" class="btn btn-primary" style="margin-top: 16px;">Start a campaign <span class="arw">→</span></a>
        </div>
      </div>
    </section>
    """
    generate_page(f"service-{s['id']}.html", s['title'], content)

# Finally, update index.html to use the new HTML links
index_content = index_content.replace('href="#services"', 'href="services.html"')
index_content = index_content.replace('href="#approach"', 'href="about.html"')
index_content = index_content.replace('href="#contact"', 'href="contact.html"')
write_file('index.html', index_content)

print("Site generation complete.")
