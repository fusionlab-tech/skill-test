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
    
    # Spanish audio content - Updated with more native-like expressions
    spanish_content = {
        'spanish_ai_healthcare.mp3': """Bueno, la verdad es que la inteligencia artificial en medicina está dando mucho de qué hablar últimamente. Yo creo que es una herramienta fantástica, pero hay que tener cuidado de no pasarse. Mira, la IA puede ser súper útil para los médicos, especialmente para detectar cosas que tal vez el ojo humano no ve tan fácil. Por ejemplo, en radiología, puede ayudar a encontrar tumores más pequeños o en cardiología, a ver patrones raros en los electrocardiogramas. Pero ojo, que esto no significa que vaya a reemplazar a los doctores. Para nada. El trato humano, entender al paciente, su historia, cómo se siente... eso no lo puede hacer ninguna máquina. La clave está en que la tecnología ayude a los médicos a hacer mejor su trabajo, no que los sustituya. Al final, lo importante es que el paciente reciba la mejor atención posible, y eso se logra combinando la tecnología con la experiencia y el corazón del médico.""",
        
        'spanish_environmental_policy.mp3': """Mira, entiendo que hay que hacer algo con el medio ambiente, eso está claro. Pero las políticas que están proponiendo me preocupan un poco. Es que parece que se van a cargar a las pequeñas empresas y a los pueblos que ya están pasándola mal. Además, los plazos que están poniendo son muy apretados, ¿no? Muchas regiones ni siquiera tienen la infraestructura necesaria. Aunque, bueno, no todo está mal. Hay algunas cosas que sí me gustan, como los incentivos para las energías renovables y eso de ir poco a poco con la reducción de emisiones. Lo que yo creo es que necesitamos un enfoque más balanceado, que tenga en cuenta tanto el impacto económico como los beneficios ambientales. Tal vez podríamos empezar con las medidas que sabemos que funcionan y dar más apoyo a las comunidades que van a sufrir más. El objetivo está bien, pero hay que afinar la ejecución para no arreglar un problema y crear otros nuevos.""",
        
        'spanish_urban_planning.mp3': """Las ciudades de hoy en día están en un lío tremendo. Con tanta gente, el cambio climático y la necesidad de ser más sostenibles, la cosa se está poniendo complicada. El problema es que durante años hemos estado pensando solo en los coches, y eso nos ha traído un montón de problemas: contaminación, atascos, y además la gente ya no se conoce ni se habla. Lo que yo propongo es darle la vuelta a esto completamente. Hay que diseñar las ciudades pensando en las personas, no en los vehículos. Eso significa más espacio para caminar, carriles para bicicletas, transporte público que funcione de verdad. Pero también es súper importante meter más verde en las ciudades. No me refiero solo a parques grandes, sino también a jardines pequeños, huertos comunitarios, corredores verdes que conecten los barrios. Estos espacios hacen mil cosas: limpian el aire, refrescan la ciudad, dan lugar para que la gente se relaje y se conozca. Al final, se trata de hacer ciudades donde la gente quiera vivir, no solo pasar de largo en coche.""",
        
        'spanish_education_reform.mp3': """A ver, con el tema de la educación se está hablando mucho de exámenes y de cambiar los programas, pero creo que nos estamos perdiendo lo más importante: que los chicos realmente se interesen por lo que están aprendiendo. Cuando un estudiante está motivado de verdad, cuando ve que lo que estudia le sirve para algo en la vida, ahí es cuando de verdad aprende. Los mejores programas educativos que he visto son los que conectan lo que se enseña en clase con la realidad. No se trata de tirar por la borda las materias tradicionales, sino de presentarlas de una manera que enganche a los estudiantes, que les despierte la curiosidad. La tecnología puede ayudar mucho en esto, pero no es la solución mágica. Lo que realmente marca la diferencia son los profesores que crean un ambiente donde los estudiantes se sienten valorados, donde los escuchan y los motivan a explorar. Cuando los chicos están comprometidos, desarrollan el pensamiento crítico, la creatividad y el amor por aprender que los va a acompañar toda la vida. Ese compromiso es la base de todo lo demás en educación."""
    }
    
    print("🎵 Generating Audio Files for Language Exams...")
    print("=" * 60)
    
    # Generate English audio files
    print("\n📝 Generating English Audio Files:")
    for filename, text in english_content.items():
        filepath = os.path.join('audio', filename)
        create_audio_file(text, filepath, voice_rate=150, voice_volume=0.9)
    
    # Generate Spanish audio files with more natural settings
    print("\n📝 Generating Spanish Audio Files:")
    for filename, text in spanish_content.items():
        filepath = os.path.join('audio', filename)
        # Use slightly slower rate for more natural Spanish speech
        create_audio_file(text, filepath, voice_rate=140, voice_volume=0.9)
    
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
