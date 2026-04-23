#!/usr/bin/env python3
"""
Fix sidebar nav + header nav on all ellara/*.html pages.
Replaces the 5 placeholder global nav items with real course chapter navigation.
"""

import os
import re

ELLARA_DIR = os.path.join(os.path.dirname(__file__), 'ellara')

# Maps filename (without .html) to which nav key should be active
ACTIVE_MAP = {
    'index':           'index',
    'atomfysik':       'atomfysik',
    'atomfysik_test':  'atomfysik',
    'material':        'material',
    'material_test':   'material',
    'symboler':        'symboler',
    'test_symboler':   'symboler',
    'kabeltyper':      'kabeltyper',
    'kabeltyper_test': 'kabeltyper',
    'kabeldim':        'kabeldim',
    'kabeldim_test':   'kabeldim',
    'kretsar':         'kretsar',
    'kretsar_test':    'kretsar',
    'trefas':          'trefas',
    'trefas_test':     'trefas',
    'skydd':           'skydd',
    'skydd_test':      'skydd',
    'installation':    'installation',
    'installation_test': 'installation',
    'tecken':          'tecken',
    'matematik':       'matematik',
    'prefix_test':     'matematik',
    'test_brak':       'matematik',
    'formler':         'formler',
    'formelval_test':  'formler',
    'ovningar':        'ovningar',
    'rakne_quiz':      'ovningar',
    'flashcards':      'flashcards',
    'ledarfarg_quiz':  'flashcards',
    'prov':            None,
    'prov_interaktiv': None,
}

# Each entry: (icon, href, label, nav_key)  or 'divider'
NAV_ITEMS = [
    ('arrow_back',     '../index.html',    'Alla kurser',    None),
    'divider',
    ('home',           'index.html',       'Hem',            'index'),
    ('science',        'atomfysik.html',   'Atomfysik',      'atomfysik'),
    ('category',       'material.html',    'Material',       'material'),
    ('electric_bolt',  'symboler.html',    'Symboler',       'symboler'),
    ('cable',          'kabeltyper.html',  'Kabeltyper',     'kabeltyper'),
    ('straighten',     'kabeldim.html',    'Kabeldim.',      'kabeldim'),
    ('schema',         'kretsar.html',     'Kretsar',        'kretsar'),
    ('compress',       'trefas.html',      'Trefas',         'trefas'),
    ('shield',         'skydd.html',       'Skydd',          'skydd'),
    ('build',          'installation.html','Installation',   'installation'),
    ('tag',            'tecken.html',      'Tecken',         'tecken'),
    ('calculate',      'matematik.html',   'Matematik',      'matematik'),
    'divider',
    ('description',    'formler.html',     'Formelblad',     'formler'),
    ('fitness_center', 'ovningar.html',    'Övningar',       'ovningar'),
    ('style',          'flashcards.html',  'Flashcards',     'flashcards'),
]


def build_sidebar_nav(active_key):
    lines = ['  <nav class="app-nav">']
    for item in NAV_ITEMS:
        if item == 'divider':
            lines.append('    <hr class="sidebar-divider">')
            continue
        icon, href, label, key = item
        active = ' active' if (key is not None and key == active_key) else ''
        # First item (Alla kurser) normal size; rest compact
        size_class = ' app-nav-item--sm' if key is not None else ''
        lines.append(f'    <a href="{href}" class="app-nav-item{size_class}{active}">')
        lines.append(f'      <span class="material-symbols-outlined">{icon}</span>')
        lines.append(f'      {label}')
        lines.append('    </a>')
    lines.append('  </nav>')
    return '\n'.join(lines)


def build_header_nav():
    """Two-item header nav for all ellara pages."""
    return (
        '      <nav class="app-header-nav">\n'
        '        <a href="../index.html">Kurser</a>\n'
        '        <a href="index.html" class="active">Ellära</a>\n'
        '      </nav>'
    )


def process_file(filepath, active_key):
    fname = os.path.basename(filepath)

    with open(filepath, 'r', encoding='utf-8-sig') as f:
        content = f.read()

    if 'app-sidebar' not in content:
        print(f'  SKIP (no app-sidebar): {fname}')
        return False

    original = content

    # ── Replace sidebar nav ────────────────────────────────────────────────
    new_nav = build_sidebar_nav(active_key)
    nav_pattern = re.compile(
        r'  <nav class="app-nav">.*?</nav>',
        re.DOTALL
    )
    m = nav_pattern.search(content)
    if m:
        content = content[:m.start()] + new_nav + content[m.end():]
    else:
        print(f'  WARN (sidebar nav not found): {fname}')
        return False

    # ── Replace header nav ────────────────────────────────────────────────
    header_nav_pattern = re.compile(
        r'      <nav class="app-header-nav">.*?</nav>',
        re.DOTALL
    )
    m2 = header_nav_pattern.search(content)
    if m2:
        content = content[:m2.start()] + build_header_nav() + content[m2.end():]
    # (Some pages like chapter pages only have a breadcrumb, not a full header nav — that's OK)

    if content == original:
        print(f'  NO CHANGE: {fname}')
        return False

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'  OK: {fname}')
    return True


def main():
    files = sorted([f for f in os.listdir(ELLARA_DIR) if f.endswith('.html')])
    updated = 0
    for fname in files:
        key = fname.replace('.html', '')
        active = ACTIVE_MAP.get(key, None)
        if active is False:  # explicit skip marker
            continue
        path = os.path.join(ELLARA_DIR, fname)
        if process_file(path, active):
            updated += 1
    print(f'\nDone. {updated}/{len(files)} files updated.')


if __name__ == '__main__':
    main()
