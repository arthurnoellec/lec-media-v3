import os
import time

def list_html_files(startpath):
    html_files = []
    for root, dirs, files in os.walk(startpath):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                html_files.append((file_path, os.path.getmtime(file_path)))
    return html_files

def generate_sitemap(html_files, base_url):
    sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    for file, mod_time in html_files:
        url_path = file.replace(startpath, '').replace('\\', '/').replace('.html', '')  # Retirez l'extension .html
        last_mod_date = time.strftime('%Y-%m-%d', time.gmtime(mod_time))
        sitemap += f'  <url>\n    <loc>{base_url}{url_path}</loc>\n    <lastmod>{last_mod_date}</lastmod>\n  </url>\n'
    sitemap += '</urlset>'
    return sitemap

if __name__ == "__main__":
    startpath = './'  # Remplacez par le chemin de votre dossier cloné
    base_url = 'https://lec-media.agency/'  
    html_files = list_html_files(startpath)
    sitemap = generate_sitemap(html_files, base_url)
    with open('sitemap.xml', 'w') as f:
        f.write(sitemap)
