import os
from flask import Flask, request
from groq import Groq
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters

app = Flask(__name__)

# Бери значения из переменных окружения (Render их подставит)
TG_TOKEN = os.environ.get('TG_TOKEN')
GROQ_API_KEY = os.environ.get('GROQ_API_KEY')

client = Groq(api_key=GROQ_API_KEY)

application = Application.builder().token(TG_TOKEN).build()

async def start(update: Update, context):
    await update.message.reply_text("Привет! Пиши любой вопрос — я отвечу с помощью Groq (Llama3) 🚀")

async def handle_message(update: Update, context):
    user_message = update.message.text
    
    try:
        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": user_message}],
            model="llama-3.3-70b-versatile"  # или "llama3-70b-8192" — быстрая модель
        )
        response = chat_completion.choices[0].message.content
    except Exception as e:
        response = f"Ошибка: {str(e)} 😢 Попробуй позже"
    
    await update.message.reply_text(response)

# Регистрируем обработчики
application.add_handler(CommandHandler("start", start))
application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

@app.route('/webhook', methods=['POST'])
def webhook():
    update = Update.de_json(request.get_json(force=True), application.bot)
    application.process_update(update)
    return 'ok', 200

@app.route('/')
def index():
    return 'Бот работает! 😊'

if __name__ == '__main__':
    # Для Render не запускаем polling — только webhook
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=port)