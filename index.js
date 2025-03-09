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
	const keyboard = new InlineKeyboard()
		.url("Написать в поддержку", "https://t.me/z_web")
		.row()
		.text("Создать задачу", "create_task")
		.row()
		.text("В главное меню", "to_menu");

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
		.text("Создать задачу", "create_task")
		.row()
		.text("В главное меню", "to_menu");

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
	userSessions.set(ctx.chat.id, { linksCount: count, links: [], pause: null });
	await ctx.answerCallbackQuery();
	await ctx.reply(`Введите ${count} ссылок на объявления (по одной в каждом сообщении):`);
});

bot.on("message:text", async (ctx) => {
	const session = userSessions.get(ctx.chat.id);
	if (!session) return;

	if (!isNaN(ctx.message.text.trim())) {
		session.pause = parseInt(ctx.message.text.trim(), 10);
		userSessions.set(ctx.chat.id, session);
		await ctx.reply(`✅ Установлена пауза: ${session.pause} минут.`);
		return;
	}

	if (session.links.length >= session.linksCount) return;

	session.links.push(ctx.message.text.trim());
	userSessions.set(ctx.chat.id, session);

	if (session.links.length < session.linksCount) {
		await ctx.reply(`Принято ${session.links.length}/${session.linksCount}. Введите следующую ссылку:`);
	} else {
		const pfKeyboard = new InlineKeyboard().text("30", "set_pf_30").text("40", "set_pf_40").row().text("50", "set_pf_50").text("100", "set_pf_100");

		await ctx.reply(`✅ Все ${session.linksCount} ссылок приняты. Задача сформирована.\nВыберите количество ПФ на объявление:`, {
			reply_markup: pfKeyboard,
		});
	}
});

bot.callbackQuery(/^set_pf_(\d+)$/, async (ctx) => {
	await ctx.answerCallbackQuery();
	const timeKeyboard = new InlineKeyboard()
		.text("Сейчас", "set_time_now")
		.row()
		.text("00:00", "set_time_00")
		.text("6:00", "set_time_06")
		.row()
		.text("9:00", "set_time_09")
		.text("12:00", "set_time_12")
		.row()
		.text("16:00", "set_time_16")
		.text("18:00", "set_time_18");

	await ctx.reply("🤖Стартуем! Введите время старта. Например 8:00, или нажмите одну из кнопок.\n\nСовет! Накручивайте ПФ в течении дня, начните с 6:00.", {
		reply_markup: timeKeyboard,
	});
});

bot.callbackQuery(/^set_time_.*$/, async (ctx) => {
	await ctx.answerCallbackQuery();
	const pauseKeyboard = new InlineKeyboard().text("Без паузы", "set_pause_none").row().text("Авто", "set_pause_auto");

	await ctx.reply(
		"🤖Теперь напишите время паузы между ПФ, в минутах. Например 20, или нажмите кнопку 'Авто'. Я рассчитаю время паузы до конца рабочего дня (21:00).\n\n" +
			"Пример: Если Вы заказали 50 ПФ и выбрали время старта 6:00, тогда при нажатии кнопки 'Авто' просмотры будут накручиваться каждый день, с 6:00 до 21:00, с промежутком 15 минут. " +
			"Напоминаем, что лучше всего крутить равномерно, в течении дня.",
		{
			reply_markup: pauseKeyboard,
		}
	);
});

bot.callbackQuery("set_pause_auto", async (ctx) => {
	await ctx.answerCallbackQuery();

	// Получаем сессию текущего пользователя
	let session = userSessions.get(ctx.chat.id);

	// Если сессии нет, создаем новую
	if (!session) {
		session = {};
	}

	session.pause = "Авто";
	userSessions.set(ctx.chat.id, session);

	// Клавиатура для выбора даты старта
	const dateKeyboard = new InlineKeyboard().text("Сегодня", "set_date_today").text("Завтра", "set_date_tomorrow");

	await ctx.reply("🤖 Выберите дату старта:\n- Нажмите 'Сегодня' или 'Завтра', либо введите дату вручную (например, 1.01.2024).", {
		reply_markup: dateKeyboard,
	});
});

bot.callbackQuery("set_date_today", async (ctx) => {
    await ctx.answerCallbackQuery();

    const today = new Date();
    const formattedDate = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;

    let session = userSessions.get(ctx.chat.id);
    if (!session) {
        session = {};
    }

    session.startDate = formattedDate;
    userSessions.set(ctx.chat.id, session);

    // Send a message and offer the user to choose the number of days
    await ctx.reply(`✅ Дата старта установлена на ${formattedDate}. Выберите количество дней накрутки:`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: '1 день', callback_data: 'set_days_1' }],
                [{ text: '3 дня', callback_data: 'set_days_3' }],
                [{ text: '7 дней', callback_data: 'set_days_7' }],
                [{ text: '14 дней', callback_data: 'set_days_14' }],
                [{ text: '30 дней', callback_data: 'set_days_30' }]
            ]
        }
    });
});

bot.callbackQuery("set_date_tomorrow", async (ctx) => {
    await ctx.answerCallbackQuery();

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = `${tomorrow.getDate()}.${tomorrow.getMonth() + 1}.${tomorrow.getFullYear()}`;

    let session = userSessions.get(ctx.chat.id);
    if (!session) {
        session = {};
    }

    session.startDate = formattedDate;
    userSessions.set(ctx.chat.id, session);

    // Send a message and offer the user to choose the number of days
    await ctx.reply(`✅ Дата старта установлена на ${formattedDate}. Выберите количество дней накрутки:`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: '1 день', callback_data: 'set_days_1' }],
                [{ text: '3 дня', callback_data: 'set_days_3' }],
                [{ text: '7 дней', callback_data: 'set_days_7' }],
                [{ text: '14 дней', callback_data: 'set_days_14' }],
                [{ text: '30 дней', callback_data: 'set_days_30' }]
            ]
        }
    });
});

// Handling day selection callback
bot.callbackQuery("set_days_1", async (ctx) => {
    await ctx.answerCallbackQuery();
    let session = userSessions.get(ctx.chat.id);
    if (!session) {
        session = {};
    }

    session.days = 1;
    userSessions.set(ctx.chat.id, session);
    await ctx.reply(`✅ Количество дней накрутки установлено на 1 день.`);
});

bot.callbackQuery("set_days_3", async (ctx) => {
    await ctx.answerCallbackQuery();
    let session = userSessions.get(ctx.chat.id);
    if (!session) {
        session = {};
    }

    session.days = 3;
    userSessions.set(ctx.chat.id, session);
    await ctx.reply(`✅ Количество дней накрутки установлено на 3 дня.`);
});

bot.callbackQuery("set_days_7", async (ctx) => {
    await ctx.answerCallbackQuery();
    let session = userSessions.get(ctx.chat.id);
    if (!session) {
        session = {};
    }

    session.days = 7;
    userSessions.set(ctx.chat.id, session);
    await ctx.reply(`✅ Количество дней накрутки установлено на 7 дней.`);
});

bot.callbackQuery("set_days_14", async (ctx) => {
    await ctx.answerCallbackQuery();
    let session = userSessions.get(ctx.chat.id);
    if (!session) {
        session = {};
    }

    session.days = 14;
    userSessions.set(ctx.chat.id, session);
    await ctx.reply(`✅ Количество дней накрутки установлено на 14 дней.`);
});

bot.callbackQuery("set_days_30", async (ctx) => {
    await ctx.answerCallbackQuery();
    let session = userSessions.get(ctx.chat.id);
    if (!session) {
        session = {};
    }

    session.days = 30;
    userSessions.set(ctx.chat.id, session);
    await ctx.reply(`✅ Количество дней накрутки установлено на 30 дней.`);
});


bot.catch((err) => {
	console.error("Global Error:", err);
	console.error("Error Context:", err.ctx?.update);
});

bot.start();
