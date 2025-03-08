const { Bot, InlineKeyboard } = require("grammy");
require("dotenv").config();

const bot = new Bot(process.env.BOT_API_KEY);

const userSessions = new Map();

bot.command("start", async (ctx) => {
	const keyboard = new InlineKeyboard()
		.url("Задать вопрос", "https://t.me/z_web")
		.row()
		.text("Как это работает?", "how_it_works")
		.row()
		.text("О нас", "about_us")
		.row()
		.text("Ежедневный подарок", "daily_gift")
		.row()
		.text("Создать задачу", "create_task");

	await ctx.reply(
		"🤖 <b>Сейчас я расскажу, как наши верифицированные аккаунты совершают накрутку.</b>\n\n" +
			"<b>Алгоритм действий:</b> Выбирает город, вводит поисковой запрос, ищет объявление (глубокий фактор), " +
			"просматривает все фотографии, текст, карту (поверхностный фактор), добавляет в избранное (глубокий фактор), " +
			"подписывается на продавца и запрашивает контакт (глубокий фактор). <i>Общее время нахождения на объявлении — 2 минуты.</i> " +
			"Мы следим за тем, чтобы накрутка выглядела естественно и не привлекала внимание модераторов.\n\n" +
			"<b>Стоимость 1 ПФ: 7 руб.</b>\n\n" +
			"Итак, давайте создадим задачу, далее я расскажу вам про важные моменты в накрутке.",
		{ parse_mode: "HTML", reply_markup: keyboard }
	);
});

bot.callbackQuery("to_menu", async (ctx) => {
	const keyboard = new InlineKeyboard()
		.url("Задать вопрос", "https://t.me/z_web")
		.row()
		.text("Как это работает?", "how_it_works")
		.row()
		.text("О нас", "about_us")
		.row()
		.text("Ежедневный подарок", "daily_gift")
		.row()
		.text("Создать задачу", "create_task");

	await ctx.answerCallbackQuery();

	// Используем reply, если сообщение нельзя редактировать
	await ctx.reply("🤖 <b>Добро пожаловать в главное меню!</b>\n\n" + "Выберите действие:", {
		parse_mode: "HTML",
		reply_markup: keyboard,
	});
});

bot.callbackQuery("how_it_works", async (ctx) => {
	const keyboard = new InlineKeyboard().url("Написать в поддержку", "https://t.me/z_web").row().text("Создать задачу", "create_task");

	// Отвечаем на callback-запрос, чтобы убрать загрузку
	await ctx.answerCallbackQuery();

	await ctx.editMessageText(
		"<b>Алгоритм действий:</b>\n" +
			'1. Нажмите кнопку "Создать задачу"\n' +
			"2. Выберите количество объявлений для работы\n" +
			"3. Добавляйте ссылки на объявления\n" +
			"4. Выставите количество ПФ\n" +
			"5. Выставите время старта\n" +
			"6. Выберите время паузы\n" +
			"7. Выберите дату старта\n" +
			"8. Выставите количество дней работы задачи\n" +
			"9. Подтвердите задачу\n" +
			"10. После оплаты задача будет запущена в работу!",
		{ parse_mode: "HTML", reply_markup: keyboard }
	);
});

bot.callbackQuery("about_us", async (ctx) => {
	const keyboard = new InlineKeyboard()
		.url("Политика конфиденциальности", "https://t.me/z_web")
		.row()
		.url("Публичная оферта", "https://t.me/z_web")
		.row()
		.url("Написать в поддержку", "https://t.me/z_web")
		.row()
		.text("Создать задачу", "create_task");

	// Отвечаем на callback-запрос, чтобы убрать загрузку
	await ctx.answerCallbackQuery();

	await ctx.reply(
		"🤖 <b>Кто мы?</b>\n\n" +
			"Мы - команда <b>Avitolog</b>, создавшая инновационного бота для Telegram, предназначенного для продавцов на Avito, желающих максимизировать эффективность и видимость своих объявлений. Наша миссия - обеспечить каждому пользователю возможность выделиться среди множества других объявлений, увеличить интерес потенциальных покупателей и, как следствие, повысить свои продажи, минимизировать общие затраты на рекламу.\n\n" +
			"<b>Зачем мы это делаем?</b>\n\n" +
			"Мы понимаем, как трудно пробиться через информационный шум на платформах подобных Avito, где ежедневно публикуется десятки тысяч объявлений. Наша цель - упростить продавцам процесс продвижения их товаров и услуг, предоставив настраиваемый инструмент по поднятию в поиске, который помогает выделиться среди конкурентов в любой нише.\n\n" +
			"Используя нашего бота, продавцы могут сосредоточиться на том, что действительно важно - на качестве своих товаров и услуг, а также на обслуживании клиентов, в то время как мы заботимся о том, чтобы покупатели всегда вас видели.\n\n" +
			"<b>Что мы предлагаем?</b>\n\n" +
			"Наши технологии и алгоритмы помогли нам создать самый эффективный способ продвижения - <b>настраиваемый поведенческий фактор</b>, который полностью повторяет поведение пользователей, их случайность действий для поднятия рейтинга популярности и актуальности объявления.\n\n" +
			"Активность объявления и правильное количество ПФ напрямую влияет на его выдачу в поиске, а мы делаем так, чтобы <b>математика всегда складывалась</b> и не превышала максимально допустимый порог в категории на выбранный период. Это позволяет <b>естественно вписываться в алгоритм</b> и без рисков продвигать объявление.\n\n" +
			"Присоединяйтесь к нам и дайте вашим объявлениям на Avito преимущество, которое они заслуживают!",
		{ parse_mode: "HTML", reply_markup: keyboard }
	);
});

bot.callbackQuery("daily_gift", async (ctx) => {
	const keyboard = new InlineKeyboard().text("Перейти в главное меню", "to_menu");

	await ctx.answerCallbackQuery();
	await ctx.reply("🎁 <b>Сегодняшний подарок:</b> 10 бонусов на ваш счет!", {
		parse_mode: "HTML",
		reply_markup: keyboard,
	});
});

bot.callbackQuery("create_task", async (ctx) => {
    await ctx.answerCallbackQuery();
    const keyboard = new InlineKeyboard();
    for (let i = 1; i <= 10; i++) {
        keyboard.text(`${i}`, `set_links_${i}`);
        if (i % 5 === 0) keyboard.row();
    }
    await ctx.reply("Выберите количество ссылок на объявления (1-10):", {
        reply_markup: keyboard,
    });
});

bot.callbackQuery(/^set_links_(\d+)$/, async (ctx) => {
    const count = parseInt(ctx.match[1], 10);
    userSessions.set(ctx.chat.id, { linksCount: count, links: [] });
    await ctx.answerCallbackQuery();
    await ctx.reply(`Введите ${count} ссылок на объявления (по одной в каждом сообщении):`);
});

bot.on("message:text", async (ctx) => {
    const session = userSessions.get(ctx.chat.id);
    if (!session || session.links.length >= session.linksCount) return;
    session.links.push(ctx.message.text.trim());
    userSessions.set(ctx.chat.id, session);
    if (session.links.length < session.linksCount) {
        await ctx.reply(`Принято ${session.links.length}/${session.linksCount}. Введите следующую ссылку:`);
    } else {
        await ctx.reply(`✅ Все ${session.linksCount} ссылок приняты. Задача сформирована.`);
    }
});


bot.catch((err) => {
	console.error("Global Error:", err);
	console.error("Error Context:", err.ctx?.update);
});

bot.start();
