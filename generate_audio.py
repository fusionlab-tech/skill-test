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
    
    # English audio content - Updated with more native-like expressions (B2-C1 Level)
    english_content = {
        'english_ai_healthcare.mp3': """So, artificial intelligence in healthcare is really making waves these days, and I think it's absolutely fascinating, but we need to be careful not to get carried away. Look, AI can be incredibly useful for doctors, especially when it comes to spotting things that the human eye might miss. For instance, in radiology, it can help detect smaller tumors earlier, or in cardiology, it can identify unusual patterns in EKG readings that might be hard to catch. But here's the thing - this doesn't mean AI is going to replace doctors. Not at all. The human touch, understanding the patient, their history, how they're feeling emotionally - no machine can do that. The key is using technology to help doctors do their job better, not to replace them. At the end of the day, what matters most is that patients get the best possible care, and that happens when we combine technology with the doctor's experience and genuine care for their patients.""",
        
        'english_environmental_policy.mp3': """You know, I understand that we need to do something about the environment - that's crystal clear. But I'm a bit concerned about the policies they're proposing. It seems like they're going to hit small businesses and rural communities pretty hard, and these places are already struggling as it is. Plus, the timelines they're setting are really tight, don't you think? Many regions don't even have the infrastructure in place to meet these deadlines. Although, to be fair, not everything about the proposal is bad. There are some aspects I actually like, such as the incentives for renewable energy and the gradual approach to reducing emissions. What I think we need is a more balanced strategy that takes into account both the economic impact and the environmental benefits. Maybe we could start with the measures we know work best and provide more support for the communities that would be most affected. The goal is definitely worthwhile, but the execution needs some fine-tuning to make sure we're not solving one problem while creating new ones.""",
        
        'english_urban_planning.mp3': """Our cities are in a real mess these days. With all the population growth, climate change, and the need to be more sustainable, things are getting pretty complicated. The problem is that for years we've been designing everything around cars, and that's created a whole bunch of issues - air pollution, traffic jams, and people don't even know their neighbors anymore. What I'm suggesting is a complete shift in how we think about urban design. We need to build cities for people, not vehicles. That means more space for walking, proper bike lanes, and public transportation that actually works. But equally important is bringing more green spaces into our cities. I'm not just talking about big parks, but also smaller community gardens, pocket parks, and green corridors that connect different neighborhoods. These spaces do so much - they clean the air, cool down the city, give people places to relax and socialize. Ultimately, it's about creating cities where people actually want to live, not just drive through.""",
        
        'english_education_reform.mp3': """Look, there's a lot of talk about education reform these days, focusing on standardized tests and changing the curriculum, but I think we're missing the most important piece of the puzzle - getting students actually interested in what they're learning. When students are genuinely engaged, when they can see how what they're studying connects to their lives and future goals, that's when real learning happens. The most successful education programs I've seen are the ones that link classroom content to real-world applications. This doesn't mean throwing out traditional subjects, but rather presenting them in ways that spark students' curiosity and imagination. Technology can definitely help with this, but it's not the magic solution. The real innovation comes from teachers who create learning environments where students feel valued, where their voices are heard, and where they're motivated to explore and discover. When students are engaged, they develop critical thinking skills, creativity, and a genuine love of learning that stays with them long after they leave the classroom. That engagement is the foundation everything else in education needs to be built on."""
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
    
    # Generate English audio files with more natural settings
    print("\n📝 Generating English Audio Files:")
    for filename, text in english_content.items():
        filepath = os.path.join('audio', filename)
        # Use slightly slower rate for more natural English speech
        create_audio_file(text, filepath, voice_rate=145, voice_volume=0.9)
    
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
