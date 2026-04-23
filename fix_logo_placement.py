#!/usr/bin/env python3
"""
Move a.app-header-logo from the top header into the sidebar,
replacing div.atelier-title in every HTML file that has the app-sidebar.
"""

import os
import re

ROOT = os.path.dirname(__file__)

# Every HTML file in the project (root + sub-folders)
HTML_FILES = []
for dirpath, _, files in os.walk(ROOT):
    # Skip hidden / build folders
    if any(part.startswith('.') for part in dirpath.split(os.sep)):
        continue
    if 'redesign' in dirpath:
        continue
    for f in files:
        if f.endswith('.html'):
            HTML_FILES.append(os.path.join(dirpath, f))


def process(filepath):
    rel = os.path.relpath(filepath, ROOT)

    with open(filepath, 'r', encoding='utf-8-sig') as fh:
        content = fh.read()

    if 'app-sidebar' not in content:
        return False

    original = content

    depth = len(os.path.relpath(filepath, ROOT).replace('\\', '/').split('/')) - 1
    prefix = '../' * depth  # '' for root, '../' for one level deep

    # ── 1. Remove <a class="app-header-logo"> from the top header FIRST
    #    (before we insert a new one in the sidebar)
    content = re.sub(
        r'[ \t]*<a [^>]*class="app-header-logo"[^>]*>[^<]*</a>\n',
        '',
        content
    )

    # ── 2. Insert / replace logo in sidebar atelier-header
    new_title = f'<a href="{prefix}index.html" class="app-header-logo">Studieguiden</a>'

    if re.search(r'<div class="atelier-title">', content):
        # Still has the old div — replace it
        content = re.sub(
            r'<div class="atelier-title">[^<]*</div>',
            new_title,
            content
        )
    elif re.search(r'class="atelier-header"', content) and new_title not in content:
        # atelier-title already stripped (previous run) — insert before atelier-sub
        content = re.sub(
            r'(<div class="atelier-header">\s*)',
            r'\1' + new_title + '\n    ',
            content
        )

    if content == original:
        print(f'  NO CHANGE: {rel}')
        return False

    with open(filepath, 'w', encoding='utf-8') as fh:
        fh.write(content)
    print(f'  OK: {rel}')
    return True


updated = sum(process(f) for f in sorted(HTML_FILES))
print(f'\nDone. {updated} files updated.')
