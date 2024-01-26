import { API } from "..";

export function getFlatTopics(lessons: API.Lesson[]): API.Topic[] {
  return lessons.reduce<API.Topic[]>(
    (acc, l) => [
      ...acc,
      ...(l?.topics ?? []),
      ...getFlatTopics(l?.lessons ?? []),
    ],
    []
  );
}
