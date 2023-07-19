export interface Category {
    id: number;
    name: string;
}

// export interface CategoryCount {
//     category_id: number;
//     category_question_count: {
//         total_question_count: number;
//         total_easy_question_count: number;
//         total_medium_question_count: number;
//         total_hard_question_count: number;
//     };
// }
// Category Question Count Lookup: Returns the number of questions in the database, in a specific category
// https://opentdb.com/api_count.php?category=CATEGORY_ID_HERE