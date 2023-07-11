export interface NovelType {
    novel_id: number;
    trans_id: number;
    novel_view: number;
    author: string;
    composed_year: number;
    novel_name: string;
    total_chapters?: number;
    avg_star?: number;
    novel_photo_url: string;
    novel_description: string;
    username?: string;
}

export const NovelConstant: NovelType = {
    novel_id: 0,
    trans_id: 0,
    author: "",
    composed_year: 0,
    novel_name: "",
    novel_view: 0,
    novel_photo_url: "",
    novel_description: "",
    total_chapters: 0,
    avg_star: 0,
    username: "",
};
