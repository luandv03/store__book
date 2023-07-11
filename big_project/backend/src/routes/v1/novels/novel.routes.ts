import { Router } from "express";

const novelRoutes: Router = Router();

import { NovelController } from "../../../controllers/novels/novel.controller";
import { authMiddleware } from "../../../middlewares/auth.middleware";
const novelController = new NovelController();

novelRoutes.post("/novel/create", authMiddleware, novelController.createNovel);

// create chapter
novelRoutes.post(
    "/novel/create/chapter",
    authMiddleware,
    novelController.createChapterContent
);

//search novel by novel name: /novel/view?novel_name = ...
novelRoutes.get("/novel/view", novelController.getNovelByName);

//get all novel
novelRoutes.get("/novel/view/all", novelController.getAllNovel);

//get all novel order by name
novelRoutes.get("/novel/view/novel_name", novelController.getNovelOrderByName);

// phai de tren cai param = :novel_id , neu khong no se chay vao API :novel_id truoc
//get novel by top 5 view
novelRoutes.get("/novel/view/top_view", novelController.getNovelByTopView);

// filter novel by view
novelRoutes.get("/novel/view/novel_view", novelController.listNovelByViews);

// filter novel by avg star
novelRoutes.get("/novel/view/avg_star", novelController.listNovelByStars);

//get novel by novel_id
novelRoutes.get("/novel/view/:novel_id", novelController.getNovelById);

// get novel by genre
novelRoutes.get("/novel/view/genre/:genre_id", novelController.getNovelByGenre);

//get novel by translator
novelRoutes.get(
    "/novel/view/translator/:translator_id",
    novelController.getNovelByTranslator
);

// get chapter content
novelRoutes.get(
    "/novel/:novel_id/chapter/:chapter",
    novelController.getNovelChapterContent
);

//get all chapter by novel id
novelRoutes.get(
    "/novel/:novel_id/chapters",
    novelController.getChaptersByNovelId
);

// get all genre
novelRoutes.get("/novel/genre/all/view", novelController.getAllGenre);

//get genres by novel id
novelRoutes.get("/novel/:novel_id/genre", novelController.getGenresByNovelId);

//get feedback by novel id
novelRoutes.get(
    "/novel/:novel_id/feedback",
    novelController.getFeedbackByNovelId
);

//create feedback novel
novelRoutes.post(
    "/novel/:novel_id/feedback/:user_id",
    novelController.feedbackNovel
);

// delete chapter by novel id
novelRoutes.delete(
    "/novel/:novel_id/chapter/:chapter/delete",
    novelController.deleteChapterNovel
);

// delete novel by id
novelRoutes.delete(
    "/novel/:novel_id/delete",
    novelController.deleteChapterNovel
);

export default novelRoutes;
