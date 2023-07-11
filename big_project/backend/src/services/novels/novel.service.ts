import { ResponseType } from "../../types/response.type";
import { query } from "../../db/index.db";
import { HttpStatusCode } from "../../configs/httpStatusCode.config";

interface NovelType {
    novel_id?: number;
    trans_id: number;
    author: string;
    composed_year: number;
    novel_name: string;
    novel_description: string;
    novel_photo_url: string;
    novel_view?: number;
    total_chapter?: number;
    avg_star?: number;
    chapter: number;
    chapter_content: string;
    chapter_name: string;
    username?: string;
    genre_name?: string;
}

interface ChapterContent {
    novel_id: string;
    chapter: number;
    chapter_content: string;
    chapter_name: string;
    number_of_chapter?: number;
}

interface GenreType {
    genre_id: string;
    genre_name: string;
}

interface FeedBackType {
    user_id: number;
    novel_id: number;
    feedback: string;
    star: number;
}

class NovelService {
    async createNovel(novel: NovelType): Promise<ResponseType<NovelType>> {
        try {
            const {
                trans_id,
                author,
                composed_year,
                novel_name,
                novel_photo_url,
                novel_description,
                chapter,
                chapter_content,
                chapter_name,
            } = novel;
            await query("BEGIN");
            const results = await query(
                `INSERT INTO novel(trans_id, author, composed_year, novel_name, novel_description ,novel_photo_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING novel_id`,
                [
                    trans_id,
                    author,
                    composed_year,
                    novel_name,
                    novel_description,
                    novel_photo_url,
                ]
            );

            await query(`INSERT INTO content VALUES($1, $2, $3, $4)`, [
                results.rows[0].novel_id,
                chapter,
                chapter_content,
                chapter_name,
            ]);

            await query("COMMIT");

            return {
                statusCode: HttpStatusCode.CREATED,
                message: "Created novel success",
            };
        } catch (error) {
            await query("ROLLBACK");
            console.log(error);
            return {
                statusCode: HttpStatusCode.BAD_REQUEST,
                message: "FAILURE CREATED",
            };
        }
    }

    async createChapterNovel(
        chapterContent: ChapterContent
    ): Promise<ResponseType<ChapterContent>> {
        const { novel_id, chapter, chapter_content, chapter_name } =
            chapterContent;

        await query(`INSERT INTO content VALUES($1, $2, $3, $4, now()::date)`, [
            novel_id,
            chapter,
            chapter_content,
            chapter_name,
        ]);

        return {
            statusCode: HttpStatusCode.CREATED,
            message: "Created Chapter Successfull",
        };
    }

    async deleteChapterNovel(
        novel_id: number,
        chapter: number
    ): Promise<ResponseType<any>> {
        const results = await query(
            `DELETE FROM content WHERE novel_id = $1 and chapter = $2 RETURNING *`,
            [novel_id, chapter]
        );

        return {
            statusCode: HttpStatusCode.OK,
            message: "Delete chapter successful",
            data: results.rows[0],
        };
    }

    async deleteNovelById(novel_id: number): Promise<ResponseType<any>> {
        const results = await query(
            `DELETE FROM novel WHERE novel_id = $1 RETURNING *`,
            [novel_id]
        );

        return {
            statusCode: HttpStatusCode.OK,
            message: "Delete novel successful",
            data: results.rows[0],
        };
    }

    async listNovelByStars(): Promise<ResponseType<NovelType[]>> {
        const results = await query(`SELECT * FROM novel ORDER BY avg_star`);

        return {
            statusCode: HttpStatusCode.OK,
            message: "Get novels by stars avg success",
            data: results.rows,
        };
    }

    async listNovelByViews(): Promise<ResponseType<NovelType[]>> {
        const results = await query(`SELECT * FROM novel ORDER BY novel_view`);

        return {
            statusCode: HttpStatusCode.OK,
            message: "Get novels by novel view success",
            data: results.rows,
        };
    }

    // search
    async getNovelByName(
        novel_name: string
    ): Promise<ResponseType<NovelType[]>> {
        const results = await query(
            `SELECT * FROM novel WHERE novel_name ILIKE '%' || $1 || '%'`,
            [novel_name]
        );

        if (!results.rows.length) {
            return {
                statusCode: HttpStatusCode.OK,
                message: "Khong co ket qua",
                data: results.rows,
            };
        }

        return {
            statusCode: HttpStatusCode.OK,
            message: "Get Novel By Name Success",
            data: results.rows,
        };
    }

    async getNovelByGenre(genre: string): Promise<ResponseType<NovelType[]>> {
        const results = await query(
            `select novel.* from novel
        join with_genre using (novel_id)
        where with_genre.genre_id = $1`,
            [genre]
        );

        return {
            statusCode: HttpStatusCode.OK,
            message: "Get Novel By Genre Successfull",
            data: results.rows,
        };
    }

    async getNovelById(novel_id: string): Promise<ResponseType<NovelType>> {
        const results = await query(
            `SELECT novel.*, username FROM novel JOIN users ON (novel.trans_id = users.user_id) WHERE novel.novel_id = $1`,
            [novel_id]
        );

        return {
            statusCode: HttpStatusCode.OK,
            message: "Get Novel By Id Successfull",
            data: results.rows[0],
        };
    }

    async getNovelByTranslator(
        translator_id: string
    ): Promise<ResponseType<NovelType[]>> {
        const results = await query(`SELECT * FROM novel WHERE trans_id = $1`, [
            translator_id,
        ]);

        return {
            statusCode: HttpStatusCode.OK,
            message: "Get Novel By Translator Successfull",
            data: results.rows,
        };
    }

    async getNovelChapterContent(
        novel_id: string,
        chapter: string
    ): Promise<ResponseType<ChapterContent>> {
        const results = await query(
            `SELECT * FROM content WHERE novel_id = $1 AND chapter = $2`,
            [novel_id, chapter]
        );

        const results_2 = await query(
            `SELECT CAST(count(*) as INT) number_of_chapter FROM content WHERE novel_id = $1`,
            [novel_id]
        );

        const data = {
            ...results.rows[0],
            ...results_2.rows[0],
        };

        await query(
            `UPDATE novel SET novel_view = novel_view + 1 WHERE novel_id = $1`,
            [novel_id]
        );

        return {
            statusCode: HttpStatusCode.OK,
            message: "Get Novel Successfull",
            data: data,
        };
    }

    async getChaptersByNovelId(
        novel_id: number
    ): Promise<ResponseType<{ chapter_id: number; chapter_name: string }[]>> {
        const results = await query(
            `SELECT chapter, chapter_name FROM content WHERE novel_id = $1 ORDER BY chapter`,
            [novel_id]
        );

        return {
            statusCode: HttpStatusCode.OK,
            message: "Get Novel Successfull",
            data: results.rows,
        };
    }

    async getNovelByTopView(): Promise<ResponseType<NovelType[]>> {
        const results =
            await query(`SELECT * FROM novel ORDER BY novel_view DESC LIMIT 5
        `);

        return {
            statusCode: HttpStatusCode.OK,
            message: "Get Novel Top View Successfull",
            data: results.rows,
        };
    }

    //get all novel
    async getAllNovel(): Promise<ResponseType<NovelType[]>> {
        const results = await query(
            `SELECT novel.*, username FROM novel JOIN users ON users.user_id = novel.trans_id`
        );

        return {
            statusCode: HttpStatusCode.OK,
            message: "Get All Novel Successfull",
            data: results.rows,
        };
    }

    // get novel order by novel name
    async getNovelOrderByName(): Promise<ResponseType<NovelType[]>> {
        const results = await query(`SELECT * FROM novel ORDER BY novel_name`);

        return {
            statusCode: HttpStatusCode.OK,
            message: "Get Novel Order Successfull",
            data: results.rows,
        };
    }

    //get all genre : the loai truyen
    async getAllGenre(): Promise<ResponseType<GenreType[]>> {
        const results = await query(`SELECT * FROM genre`);

        return {
            statusCode: HttpStatusCode.OK,
            message: "Get Novel Order Successfull",
            data: results.rows,
        };
    }

    async getGenresByNovelId(novel_id: number): Promise<ResponseType<any>> {
        const results = await query(
            `SELECT genre_id, genre_name FROM genre JOIN with_genre USING(genre_id) WHERE novel_id = $1`,
            [novel_id]
        );

        return {
            statusCode: HttpStatusCode.OK,
            message: "Get Novel Order Successfull",
            data: results.rows,
        };
    }

    async feedbackNovel(
        feedbackData: FeedBackType
    ): Promise<ResponseType<FeedBackType>> {
        const { user_id, novel_id, feedback } = feedbackData;
        const results = await query(
            `INSERT INTO read VALUES ($1, $2, $3) RETURNING *`,
            [user_id, novel_id, feedback]
        );

        if (!results.rows.length) {
            return {
                statusCode: HttpStatusCode.NOT_ACCEPTABLE,
                message: "Feedback fail",
            };
        }

        return {
            statusCode: HttpStatusCode.CREATED,
            message: "Feedback Success",
            data: results.rows[0],
        };
    }

    async getFeedbackByNovelId(
        novel_id: number
    ): Promise<ResponseType<FeedBackType[]>> {
        const results = await query(
            `SELECT read.*, username FROM read JOIN users USING(user_id) WHERE novel_id = $1 AND feedback IS NOT NULL`,
            [novel_id]
        );

        return {
            statusCode: HttpStatusCode.OK,
            message: "Get Feedback Success",
            data: results.rows,
        };
    }
}

export const novelService = new NovelService();
