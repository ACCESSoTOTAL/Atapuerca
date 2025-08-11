#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor
from datetime import datetime

def leer_retos_desde_js():
    print("🔍 Leyendo archivo js/retos.js...")
    
    try:
        with open('js/retos.js', 'r', encoding='utf-8') as file:
            contenido = file.read()
        
        print("✅ Archivo leído correctamente")
        
        # Buscar objetos reto - patrón más flexible
        patron_reto = r'\{\s*id:\s*(\d+),[^}]*?titulo:\s*["\']([^"\']*?)["\']'
        
        retos = []
        matches = re.finditer(patron_reto, contenido, re.DOTALL)
        
        for match in matches:
            try:
                reto = {
                    'id': int(match.group(1)),
                    'titulo': match.group(2)
                }
                retos.append(reto)
                print(f"  ✓ Reto {reto['id']}: {reto['titulo'][:50]}...")
            except Exception as e:
                print(f"  ⚠️ Error procesando reto: {e}")
                continue
        
        print(f"📊 Total de retos encontrados: {len(retos)}")
        return retos
        
    except Exception as e:
        print(f"❌ Error leyendo archivo: {e}")
        return []

def crear_estilos():
    styles = getSampleStyleSheet()
    
    styles.add(ParagraphStyle(
        name='TituloPrincipal',
        parent=styles['Title'],
        fontSize=24,
        textColor=HexColor('#2C3E50'),
        spaceAfter=30,
        alignment=1
    ))
    
    styles.add(ParagraphStyle(
        name='TituloReto',
        parent=styles['Heading1'],
        fontSize=14,
        textColor=HexColor('#E74C3C'),
        spaceBefore=20,
        spaceAfter=10
    ))
    
    return styles

def generar_pdf_retos():
    print("🚀 Iniciando generación de PDF...")
    
    retos = leer_retos_desde_js()
    if not retos:
        print("❌ No se pudieron cargar los retos")
        return False
    
    print("📄 Creando documento PDF...")
    
    try:
        doc = SimpleDocTemplate(
            "docs/AtapuercaNet_Retos_Completos.pdf",
            pagesize=A4,
            rightMargin=72,
            leftMargin=72,
            topMargin=72,
            bottomMargin=18
        )
        
        styles = crear_estilos()
        story = []
        
        print("✍️ Creando contenido...")
        
        # Página de título
        story.append(Paragraph("AtapuercaNet", styles['TituloPrincipal']))
        story.append(Paragraph("Guía Completa de Retos SQL", styles['Heading1']))
        story.append(Spacer(1, 20))
        story.append(Paragraph(f"Generado el {datetime.now().strftime('%d de agosto de %Y')}", styles['Normal']))
        story.append(Paragraph(f"Total de retos: {len(retos)}", styles['Normal']))
        story.append(PageBreak())
        
        # Contenido de retos
        for reto in sorted(retos, key=lambda x: x.get('id', 0)):
            titulo_limpio = re.sub(r'[🔗👥📊🎯🏆⚡💊🌍🤖💥🔍📈🛡️🔄🌟🔮⚔️🧬📍🏗️❌🎖️📦🗺️🌐👁️📍👑💀🔀]', '', reto.get('titulo', 'Sin título'))
            titulo_completo = f"Reto {reto.get('id', 0)}: {titulo_limpio.strip()}"
            story.append(Paragraph(titulo_completo, styles['TituloReto']))
            story.append(Spacer(1, 15))
        
        # Construir PDF
        print("🔨 Construyendo PDF final...")
        doc.build(story)
        print("✅ PDF generado exitosamente: docs/AtapuercaNet_Retos_Completos.pdf")
        return True
        
    except Exception as e:
        print(f"❌ Error generando PDF: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    print("=" * 50)
    print("🚀 Generador de PDF - AtapuercaNet")
    print("=" * 50)
    resultado = generar_pdf_retos()
    if resultado:
        print("🎉 ¡Proceso completado con éxito!")
    else:
        print("💥 El proceso falló")
