import { Request, Response } from "express";

import { novelService } from "../../services/novels/novel.service";
import { HttpStatusCode } from "../../configs/httpStatusCode.config";
import { ResponseType } from "../../types/response.type";

export class NovelController {
    async createNovel(req: Request, res: Response): Promise<Response> {
        try {
            const {
                trans_id,
                author,
                composed_year,
                novel_name,
                novel_description,
                novel_photo_url,
                chapter,
                chapter_content,
                chapter_name,
            } = req.body;
            const data = await novelService.createNovel({
                trans_id,
                author,
                composed_year,
                novel_name,
                novel_photo_url,
                novel_description,
                chapter,
                chapter_content,
                chapter_name,
            });

            return res.status(data.statusCode).json(data);
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error,
            });
        }
    }

    async createChapterContent(req: Request, res: Response): Promise<any> {
        try {
            const { novel_id, chapter, chapter_content, chapter_name } =
                req.body;

            const data = await novelService.createChapterNovel({
                novel_id,
                chapter,
                chapter_content,
                chapter_name,
            });

            return res.status(data.statusCode).json(data);
        } catch (error) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
                message: "Internal Server Error",
                error: error,
            });
        }
    }

    async deleteChapterNovel(req: Request, res: Response): Promise<any> {
        try {
            const { novel_id } = req.params;
            const { chapter } = req.body;

            const data = await novelService.deleteChapterNovel(
                Number(novel_id),
                Number(chapter)
            );

            return res.status(data.statusCode).json(data);
        } catch (error) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
                message: "Internal Server Error",
            });
        }
    }

    async deleteNovelById(req: Request, res: Response): Promise<any> {
        try {
            const { novel_id } = req.params;

            const data = await novelService.deleteNovelById(Number(novel_id));

            return res.status(data.statusCode).json(data);
        } catch (error) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
                message: "Internal Server Error",
            });
        }
    }

    async listNovelByStars(req: Request, res: Response): Promise<any> {
        try {
            const data = await novelService.listNovelByStars();

            return res.status(data.statusCode).json(data);
        } catch (error) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
                message: "Internal Server Error",
            });
        }
    }

    async listNovelByViews(req: Request, res: Response): Promise<any> {
        try {
            const data = await novelService.listNovelByViews();

            return res.status(data.statusCode).json(data);
        } catch (error) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
                message: "Internal Server Error",
            });
        }
    }

    async getNovelByName(req: Request, res: Response): Promise<any> {
        try {
            const novel_name: string = req.query.novel_name as string;
            const data = await novelService.getNovelByName(novel_name);

            return res.status(data.statusCode).json(data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }

    async getNovelByGenre(req: Request, res: Response): Promise<any> {
        try {
            const genre_id = req.params.genre_id;

            const data = await novelService.getNovelByGenre(genre_id);

            return res.status(data.statusCode).json(data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }

    async getNovelById(req: Request, res: Response): Promise<any> {
        try {
            const novel_id = req.params.novel_id;
            const data = await novelService.getNovelById(novel_id);

            return res.status(data.statusCode).json(data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }

    async getNovelByTranslator(req: Request, res: Response): Promise<any> {
        try {
            const translator_id = req.params.translator_id;
            const data = await novelService.getNovelByTranslator(translator_id);

            return res.status(data.statusCode).json(data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }

    async getNovelChapterContent(req: Request, res: Response): Promise<any> {
        try {
            const { novel_id, chapter } = req.params;

            const data = await novelService.getNovelChapterContent(
                novel_id,
                chapter
            );

            return res.status(data.statusCode).json(data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }

    async getChaptersByNovelId(req: Request, res: Response): Promise<any> {
        try {
            const { novel_id } = req.params;
            const data = await novelService.getChaptersByNovelId(
                Number(novel_id)
            );

            return res.status(data.statusCode).json(data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }

    async getNovelByTopView(req: Request, res: Response): Promise<any> {
        try {
            const data = await novelService.getNovelByTopView();

            return res.status(data.statusCode).json(data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }

    async getAllNovel(req: Request, res: Response): Promise<any> {
        try {
            const data = await novelService.getAllNovel();

            return res.status(data.statusCode).json(data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }

    async getNovelOrderByName(req: Request, res: Response): Promise<any> {
        try {
            const data = await novelService.getNovelOrderByName();

            return res.status(data.statusCode).json(data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }

    async getAllGenre(req: Request, res: Response): Promise<any> {
        try {
            const data = await novelService.getAllGenre();

            return res.status(data.statusCode).json(data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }

    async getGenresByNovelId(req: Request, res: Response): Promise<any> {
        try {
            const { novel_id } = req.params;
            const data = await novelService.getGenresByNovelId(
                Number(novel_id)
            );

            return res.status(data.statusCode).json(data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }

    async feedbackNovel(req: Request, res: Response): Promise<any> {
        try {
            const { novel_id, user_id } = req.params;
            const { feedback, star } = req.body;
            const payload = {
                novel_id: Number(novel_id),
                user_id: Number(user_id),
                feedback,
                star,
            };
            const data = await novelService.feedbackNovel(payload);

            return res.status(data.statusCode).json(data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }

    async getFeedbackByNovelId(req: Request, res: Response): Promise<any> {
        try {
            const { novel_id } = req.params;

            const data = await novelService.getFeedbackByNovelId(
                Number(novel_id)
            );

            return res.status(data.statusCode).json(data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}
