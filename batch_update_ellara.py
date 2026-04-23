#!/usr/bin/env python3
"""
Batch-update all ellara/*.html (except index.html and prov.html) with new app shell.
Replaces: old <nav> + <div class="layout-wrapper"> + optional <aside class="sidebar">
With: new app-sidebar + app-content + app-header shell
"""

import os
import re
import sys

ELLARA_DIR = os.path.join(os.path.dirname(__file__), 'ellara')

# Files to SKIP (print page / already updated)
SKIP = {'index.html', 'prov.html'}

NEW_OPENING = '''\n\n<!-- ===== FIXED LEFT SIDEBAR ===== -->
<aside class="app-sidebar">
  <div class="atelier-header">
    <div class="atelier-title">Technical Atelier</div>
    <span class="atelier-sub">Technical Learning</span>
  </div>

  <nav class="app-nav">
    <a href="../index.html" class="app-nav-item">
      <span class="material-symbols-outlined">dashboard</span>
      Dashboard
    </a>
    <a href="index.html" class="app-nav-item active">
      <span class="material-symbols-outlined">menu_book</span>
      Kurser
    </a>
    <a href="#" class="app-nav-item">
      <span class="material-symbols-outlined">event_note</span>
      Studieplan
    </a>
    <a href="#" class="app-nav-item">
      <span class="material-symbols-outlined">folder_open</span>
      Resurser
    </a>
    <a href="#" class="app-nav-item">
      <span class="material-symbols-outlined">verified</span>
      Certifikat
    </a>
  </nav>

  <div class="sidebar-cta-wrap">
    <button class="sidebar-cta-btn">
      <span class="material-symbols-outlined" style="font-size:1rem">add</span>
      Ny studiesession
    </button>
  </div>
</aside>

<!-- ===== MAIN CONTENT ===== -->
<div class="app-content">

  <!-- Top header bar -->
  <header class="app-header">
    <div class="app-header-left">
      <a href="../index.html" class="app-header-logo">Studieguiden</a>
      <div class="app-breadcrumb"><a href="index.html">Ellära</a></div>
    </div>
    <div class="app-header-right">
      <button class="app-header-icon" title="Notiser">
        <span class="material-symbols-outlined">notifications</span>
      </button>
      <button class="app-header-icon" title="Inställningar">
        <span class="material-symbols-outlined">settings</span>
      </button>
      <button class="theme-toggle" id="theme-toggle" title="Byt tema">Ljust</button>
      <div class="app-avatar">T</div>
    </div>
  </header>

  <div class="main-content">'''

NEW_MOBILE_NAV = '''\n  </div><!-- /main-content -->
</div><!-- /app-content -->

<!-- Mobile bottom nav -->
<nav class="mobile-nav">
  <a href="../index.html" class="mobile-nav-item">
    <span class="material-symbols-outlined">dashboard</span>
  </a>
  <a href="index.html" class="mobile-nav-item active">
    <span class="material-symbols-outlined">menu_book</span>
  </a>
  <a href="#" class="mobile-nav-item">
    <span class="material-symbols-outlined">event_note</span>
  </a>
  <a href="#" class="mobile-nav-item">
    <span class="material-symbols-outlined">person</span>
  </a>
</nav>'''


def process_file(filepath):
    filename = os.path.basename(filepath)

    with open(filepath, 'r', encoding='utf-8-sig') as f:  # utf-8-sig strips BOM
        content = f.read()

    # Skip if already updated (has app-sidebar)
    if 'app-sidebar' in content:
        print(f'  SKIP (already updated): {filename}')
        return False

    # Skip if no layout-wrapper (not a standard page)
    if 'layout-wrapper' not in content:
        print(f'  SKIP (no layout-wrapper): {filename}')
        return False

    original = content

    # ── STEP 1: Replace opening block ────────────────────────────────────────
    # Match from <body> through the closing > of <div class="main-content"...>
    # The opening nav + layout-wrapper + optional sidebar spans many lines.
    # We match up to <div class="main-content" followed by optional attributes and >
    open_pattern = re.compile(
        r'<body>\s*\n\s*<nav>.*?</nav>\s*\n<div class="layout-wrapper">'
        r'.*?<div class="main-content"[^>]*>',
        re.DOTALL
    )

    match = open_pattern.search(content)
    if not match:
        print(f'  WARN (opening pattern not found): {filename}')
        return False

    content = content[:match.start()] + '<body>' + NEW_OPENING + content[match.end():]

    # ── STEP 2: Replace closing block ────────────────────────────────────────
    # Pattern A: has comment annotations
    close_a = '  </div><!-- /main-content -->\n</div><!-- /layout-wrapper -->'
    # Pattern B: bare divs (test/quiz pages) — always "  </div>\n</div>" (2-space indent)
    close_b_pattern = re.compile(r'\n  </div>\n</div>\n')

    if close_a in content:
        content = content.replace(close_a, NEW_MOBILE_NAV, 1)
    elif close_b_pattern.search(content):
        m = close_b_pattern.search(content)
        content = content[:m.start()] + NEW_MOBILE_NAV + '\n' + content[m.end():]
    else:
        print(f'  WARN (closing pattern not found): {filename}')
        return False

    if content == original:
        print(f'  WARN (no change made): {filename}')
        return False

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f'  OK: {filename}')
    return True


def main():
    files = sorted([
        f for f in os.listdir(ELLARA_DIR)
        if f.endswith('.html') and f not in SKIP
    ])

    updated = 0
    for fname in files:
        path = os.path.join(ELLARA_DIR, fname)
        if process_file(path):
            updated += 1

    print(f'\nDone. {updated}/{len(files)} files updated.')


if __name__ == '__main__':
    main()
