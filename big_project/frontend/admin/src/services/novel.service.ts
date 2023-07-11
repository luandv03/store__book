import { BaseService } from "./base.service";

// interface ResponseType<T> {
//     statusCode: number;
//     message: string;
//     data?: T;
// }

interface NovelType {
    trans_id: number;
    author: string;
    composed_year: number;
    novel_name: string;
    novel_description: string;
    novel_photo_url: string;
    chapter: number;
    chapter_content: string;
    chapter_name: string;
}

interface ChapterType {
    novel_id: number;
    chapter: number;
    chapter_name: string;
    chapter_content: string;
}

interface Feedback {
    user_id: number;
    novel_id: number;
    feedback: string;
}

export class NovelService extends BaseService {
    async getNovelTopView() {
        try {
            const response = await this.httpClientPublic.get(
                "/novel/view/top_view"
            );

            return response.data;
        } catch (error) {
            return error;
        }
    }

    async getNovelByAvgStar() {
        try {
            const response = await this.httpClientPublic.get(
                "/novel/view/top_view"
            );

            return response.data;
        } catch (error) {
            return error;
        }
    }

    async getNovelById(novel_id: number) {
        try {
            const response = await this.httpClientPublic.get(
                "/novel/view/" + novel_id
            );

            return response.data;
        } catch (error) {
            return error;
        }
    }

    async listNovelByViews() {
        try {
            const response = await this.httpClientPublic.get(
                "/novel/view/novel_view"
            );

            return response.data;
        } catch (error) {
            return error;
        }
    }

    async listNovelByStars() {
        try {
            const response = await this.httpClientPublic.get(
                "/novel/view/avg_star"
            );

            return response.data;
        } catch (error) {
            return error;
        }
    }

    async getAllGerne() {
        try {
            const response = await this.httpClientPublic.get(
                "/novel/genre/all/view"
            );

            return response.data;
        } catch (error) {
            return error;
        }
    }

    async getNovelByGenre(genre_id: string) {
        try {
            const response = await this.httpClientPublic.get(
                "/novel/view/genre/" + genre_id
            );

            return response.data;
        } catch (error) {
            return error;
        }
    }

    async getChaptersByNovelId(novel_id: number) {
        try {
            const response = await this.httpClientPublic.get(
                `/novel/${novel_id}/chapters`
            );

            return response.data;
        } catch (error) {
            return error;
        }
    }

    async getChapterContentByNovelId(novel_id: number, chapter: number) {
        try {
            const response = await this.httpClientPublic.get(
                `/novel/${novel_id}/chapter/${chapter}`
            );

            return response.data;
        } catch (error) {
            return error;
        }
    }

    async getGenresByNovelId(novel_id: number) {
        try {
            const response = await this.httpClientPublic.get(
                `/novel/${novel_id}/genre`
            );

            return response.data;
        } catch (error) {
            return error;
        }
    }

    async getNovelsBySearchName(novel_name: string) {
        try {
            const response = await this.httpClientPublic.get(
                `/novel/view?novel_name=${novel_name}`
            );

            return response.data;
        } catch (error) {
            return error;
        }
    }

    async getNovelByTransId(transId: number) {
        try {
            const response = await this.httpClientPrivate.get(
                `/novel/view/translator/${transId}`
            );

            return response.data;
        } catch (error) {
            return error;
        }
    }

    async createNovel(novel: NovelType) {
        try {
            const response = await this.httpClientPrivate.post(
                `/novel/create/`,
                novel
            );

            return response.data;
        } catch (error) {
            return error;
        }
    }

    async createChapterByNovelId(chapter: ChapterType) {
        try {
            const response = await this.httpClientPrivate.post(
                `/novel/create/chapter`,
                chapter
            );

            return response.data;
        } catch (error) {
            return error;
        }
    }

    async getAllNovel() {
        try {
            const response = await this.httpClientPublic.get(`/novel/view/all`);

            return response.data;
        } catch (error) {
            return error;
        }
    }

    async getNovelOrderByName() {
        try {
            const response = await this.httpClientPublic.get(
                `/novel/view/novel_name`
            );

            return response.data;
        } catch (error) {
            return error;
        }
    }

    async getFeedbackByNovelId(novel_id: number) {
        try {
            const response = await this.httpClientPublic.get(
                `/novel/${novel_id}/feedback`
            );

            return response.data;
        } catch (error) {
            return error;
        }
    }

    async feedbackNovel(payload: Feedback) {
        try {
            const { novel_id, user_id, feedback } = payload;
            const response = await this.httpClientPrivate.post(
                `/novel/${novel_id}/feedback/${user_id}`,
                { feedback }
            );

            return response.data;
        } catch (error) {
            return error;
        }
    }
}

export const novelService = new NovelService();
