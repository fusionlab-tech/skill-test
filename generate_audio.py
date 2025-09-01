import pyttsx3
import os

def create_audio_file(text, filename, voice_rate=150, voice_volume=0.9):
    """Create an audio file from text using text-to-speech"""
    try:
        # Initialize the text-to-speech engine
        engine = pyttsx3.init()
        
        # Set properties
        engine.setProperty('rate', voice_rate)  # Speed of speech
        engine.setProperty('volume', voice_volume)  # Volume level
        
        # Get available voices
        voices = engine.getProperty('voices')
        
        # Set voice (use index 0 for default voice)
        if voices:
            engine.setProperty('voice', voices[0].id)
        
        # Create audio file
        engine.save_to_file(text, filename)
        engine.runAndWait()
        
        print(f"✅ Created audio file: {filename}")
        return True
        
    except Exception as e:
        print(f"❌ Error creating {filename}: {str(e)}")
        return False

def main():
    """Generate all audio files for the language exams"""
    
    # Ensure audio directory exists
    if not os.path.exists('audio'):
        os.makedirs('audio')
    
    # English audio content
    english_content = {
        'english_ai_healthcare.mp3': """The integration of artificial intelligence in healthcare represents a paradigm shift that should be approached with both optimism and caution. While AI has demonstrated remarkable capabilities in diagnostic imaging and pattern recognition, it's crucial to understand that these technologies work best as complementary tools rather than replacements for human medical expertise. The most successful implementations we've seen involve AI systems that assist radiologists in detecting early-stage cancers or help cardiologists identify subtle patterns in EKG readings. However, the human element remains irreplaceable - the ability to consider a patient's unique circumstances, medical history, and emotional state. AI should enhance, not replace, the doctor-patient relationship. The key is finding the right balance where technology amplifies human capabilities while maintaining the essential human touch that defines quality healthcare.""",
        
        'english_environmental_policy.mp3': """I have significant concerns about the proposed environmental regulations, though I recognize the urgent need to address climate change. The current proposal, while well-intentioned, appears to place disproportionate economic burdens on small businesses and rural communities that are already struggling. The timeline for implementation seems unrealistic given the infrastructure challenges many regions face. However, I'm not entirely opposed to the concept - there are elements of the policy that show promise, particularly the incentives for renewable energy adoption and the phased approach to emissions reduction. What I'd like to see is a more balanced approach that considers economic impacts alongside environmental benefits. Perhaps we could implement the most effective measures first while providing more support for communities that would be most affected. The goal is admirable, but the execution needs refinement to ensure we don't solve one problem while creating others.""",
        
        'english_urban_planning.mp3': """Our cities are facing unprecedented challenges with population growth, climate change, and the need for sustainable development. The traditional approach of prioritizing automobile infrastructure has created numerous problems - from air pollution to social isolation. What I strongly recommend is a fundamental shift toward human-centered urban design. This means creating more pedestrian-friendly zones with wider sidewalks, dedicated bike lanes, and accessible public transportation. But equally important is the integration of green spaces throughout our urban areas. We need to transform concrete jungles into living, breathing environments. This includes not just large parks, but also smaller pocket parks, community gardens, and green corridors that connect neighborhoods. These spaces serve multiple purposes - they improve air quality, reduce urban heat island effects, provide recreational opportunities, and create social gathering places that strengthen community bonds. The key is designing cities for people, not just cars.""",
        
        'english_education_reform.mp3': """The current debate about education reform often focuses on standardized testing and curriculum changes, but I believe we're missing the most fundamental element - student engagement. When students are genuinely engaged in their learning, when they see the relevance of what they're studying to their lives and future aspirations, that's when real learning happens. The most successful educational programs I've observed are those that connect classroom content to real-world applications. This doesn't mean abandoning traditional subjects, but rather presenting them in ways that capture students' imagination and curiosity. Technology can be a powerful tool in this process, but it's not the solution itself. The real innovation comes from teachers who create learning environments where students feel valued, heard, and motivated to explore. When students are engaged, they develop critical thinking skills, creativity, and a love of learning that extends far beyond the classroom. This engagement is the foundation upon which all other educational improvements must be built."""
    }
    
    # Spanish audio content
    spanish_content = {
        'spanish_ai_healthcare.mp3': """La integración de la inteligencia artificial en la atención médica representa un cambio de paradigma que debe abordarse con optimismo y cautela. Si bien la IA ha demostrado capacidades notables en imágenes diagnósticas y reconocimiento de patrones, es crucial entender que estas tecnologías funcionan mejor como herramientas complementarias en lugar de reemplazos para la experiencia médica humana. Las implementaciones más exitosas que hemos visto involucran sistemas de IA que asisten a radiólogos en la detección de cánceres en etapa temprana o ayudan a cardiólogos a identificar patrones sutiles en lecturas de EKG. Sin embargo, el elemento humano sigue siendo irreemplazable: la capacidad de considerar las circunstancias únicas del paciente, su historial médico y su estado emocional. La IA debe mejorar, no reemplazar, la relación médico-paciente. La clave es encontrar el equilibrio correcto donde la tecnología amplifica las capacidades humanas mientras mantiene el toque humano esencial que define la atención médica de calidad.""",
        
        'spanish_environmental_policy.mp3': """Tengo preocupaciones significativas sobre las regulaciones ambientales propuestas, aunque reconozco la necesidad urgente de abordar el cambio climático. La propuesta actual, aunque bien intencionada, parece colocar cargas económicas desproporcionadas en pequeñas empresas y comunidades rurales que ya están luchando. El cronograma de implementación parece poco realista dado los desafíos de infraestructura que muchas regiones enfrentan. Sin embargo, no me opongo completamente al concepto: hay elementos de la política que muestran promesa, particularmente los incentivos para la adopción de energía renovable y el enfoque gradual para la reducción de emisiones. Lo que me gustaría ver es un enfoque más equilibrado que considere los impactos económicos junto con los beneficios ambientales. Quizás podríamos implementar las medidas más efectivas primero mientras proporcionamos más apoyo a las comunidades que serían más afectadas. El objetivo es admirable, pero la ejecución necesita refinamiento para asegurar que no resolvamos un problema mientras creamos otros.""",
        
        'spanish_urban_planning.mp3': """Nuestras ciudades enfrentan desafíos sin precedentes con el crecimiento de la población, el cambio climático y la necesidad de desarrollo sostenible. El enfoque tradicional de priorizar la infraestructura automotriz ha creado numerosos problemas, desde la contaminación del aire hasta el aislamiento social. Lo que recomiendo firmemente es un cambio fundamental hacia el diseño urbano centrado en las personas. Esto significa crear zonas más amigables para peatones con aceras más anchas, carriles dedicados para bicicletas y transporte público accesible. Pero igualmente importante es la integración de espacios verdes en todas nuestras áreas urbanas. Necesitamos transformar las junglas de concreto en entornos vivos y respirables. Esto incluye no solo parques grandes, sino también parques de bolsillo más pequeños, jardines comunitarios y corredores verdes que conecten vecindarios. Estos espacios sirven múltiples propósitos: mejoran la calidad del aire, reducen los efectos de isla de calor urbana, proporcionan oportunidades recreativas y crean lugares de reunión social que fortalecen los lazos comunitarios. La clave es diseñar ciudades para las personas, no solo para los automóviles.""",
        
        'spanish_education_reform.mp3': """El debate actual sobre la reforma educativa a menudo se enfoca en las pruebas estandarizadas y los cambios curriculares, pero creo que nos estamos perdiendo el elemento más fundamental: el compromiso del estudiante. Cuando los estudiantes están genuinamente comprometidos con su aprendizaje, cuando ven la relevancia de lo que están estudiando para sus vidas y aspiraciones futuras, es entonces cuando ocurre el aprendizaje real. Los programas educativos más exitosos que he observado son aquellos que conectan el contenido del aula con aplicaciones del mundo real. Esto no significa abandonar las materias tradicionales, sino más bien presentarlas de maneras que capturen la imaginación y curiosidad de los estudiantes. La tecnología puede ser una herramienta poderosa en este proceso, pero no es la solución en sí misma. La verdadera innovación viene de los maestros que crean entornos de aprendizaje donde los estudiantes se sienten valorados, escuchados y motivados a explorar. Cuando los estudiantes están comprometidos, desarrollan habilidades de pensamiento crítico, creatividad y amor por el aprendizaje que se extiende mucho más allá del aula. Este compromiso es la base sobre la cual deben construirse todas las demás mejoras educativas."""
    }
    
    print("🎵 Generating Audio Files for Language Exams...")
    print("=" * 60)
    
    # Generate English audio files
    print("\n📝 Generating English Audio Files:")
    for filename, text in english_content.items():
        filepath = os.path.join('audio', filename)
        create_audio_file(text, filepath, voice_rate=150, voice_volume=0.9)
    
    # Generate Spanish audio files
    print("\n📝 Generating Spanish Audio Files:")
    for filename, text in spanish_content.items():
        filepath = os.path.join('audio', filename)
        create_audio_file(text, filepath, voice_rate=150, voice_volume=0.9)
    
    print("\n" + "=" * 60)
    print("✅ Audio Generation Complete!")
    print("\n📁 Generated Files:")
    
    # List all generated files
    for filename in english_content.keys():
        filepath = os.path.join('audio', filename)
        if os.path.exists(filepath):
            size = os.path.getsize(filepath)
            print(f"  ✅ {filename} ({size} bytes)")
        else:
            print(f"  ❌ {filename} (Failed to create)")
    
    for filename in spanish_content.keys():
        filepath = os.path.join('audio', filename)
        if os.path.exists(filepath):
            size = os.path.getsize(filepath)
            print(f"  ✅ {filename} ({size} bytes)")
        else:
            print(f"  ❌ {filename} (Failed to create)")
    
    print(f"\n🎯 Total files generated: {len(english_content) + len(spanish_content)}")
    print("🎵 Audio files are ready for use in the language exams!")

if __name__ == "__main__":
    main()
