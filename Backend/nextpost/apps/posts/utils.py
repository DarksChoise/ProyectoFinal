import openai

openai.api_key = ''


def prompt_generator(idea, creatividad, tema, post_type, pensamientos, ejemplo, tono, size, red_social):
    main_prompt = (
        f"Genera una publicación para la red social: {red_social}.\n\n"
        f"Detalles de la publicación:\n"
        f"- **Idea principal**: {idea}\n"
        f"- **Nivel de creatividad deseado**: {creatividad}\n"
        f"- **Tema o enfoque**: {tema}\n"
        f"- **Tipo de publicación**: {post_type}\n\n"
        f"Consideraciones adicionales:\n"
        f"- **Pensamientos clave**: {pensamientos}\n"
        f"- **Ejemplo a seguir**: {ejemplo}\n\n"
        f"Estilo y formato:\n"
        f"- **Tono de comunicación**: {tono}\n"
        f"- **Tamaño o extensión deseada**: {size}\n\n"
        f"Por favor, asegúrate de que la publicación sea atractiva, adecuada para la audiencia de {red_social}, y cumpla con las características mencionadas."
        f"Agrega emojis, hashtags al final, menciones o cualquier otro elemento que consideres necesario para mejorar la publicación y hacerla más efectiva para que capte la atención de los usuarios."
        f"Siempre termina las publicaciones, no dejes nada a medias, y recuerda que la calidad es más importante que la cantidad."
    )

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Eres un experto en marketing y redes sociales."},
            {"role": "user", "content": main_prompt},
        ],
        max_tokens=300,
        temperature=0.5
    )
    generated_post = response['choices'][0]['message']['content']
    processed_post = " ".join(generated_post.splitlines())
    return processed_post
