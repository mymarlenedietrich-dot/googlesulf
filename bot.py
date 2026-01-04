import os
from flask import Flask, request
from groq import Groq
from telegram import Update
from telegram.ext import (
    Application,
    CommandHandler,
    MessageHandler,
    filters,
    ContextTypes
)

app = Flask(__name__)

# Берем из переменных окружения Render
TG_TOKEN = os.environ.get('TG_TOKEN')
GROQ_API_KEY = os.environ.get('GROQ_API_KEY')

groq_client = Groq(api_key=GROQ_API_KEY)

# Глобальное приложение — создаем один раз
application = Application.builder().token(TG_TOKEN).build()

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Привет! Задавай вопросы — отвечаю через Groq 🚀")

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_message = update.message.text

    try:
        completion = groq_client.chat.completions.create(
            messages=[{"role": "user", "content": user_message}],
            model="llama-3.3-70b-versatile"   # или llama3-70b-8192, mixtral-etc
        )
        response = completion.choices[0].message.content
    except Exception as e:
        response = f"Что-то пошло не так: {str(e)} 😔"

    await update.message.reply_text(response)

# Добавляем обработчики **один раз** при старте
application.add_handler(CommandHandler("start", start))
application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

@app.route('/webhook', methods=['POST'])
async def webhook():
    """Обработчик webhook"""
    update = Update.de_json(request.get_json(force=True), application.bot)
    await application.process_update(update)
    return 'ok', 200

@app.route('/')
def index():
    return 'Бот жив! 😊'

if __name__ == '__main__':
    # Для Render — запускаем Flask
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=port)