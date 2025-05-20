import type { Question } from "./components/app/questions/questions";

const API_URL = "http://localhost:8000";

const sendDocument = async (document: string, examKey: string) => {
  const sendDocumentApiUrl = `${API_URL}/documents/`;

  const formData = new FormData();
  const file = new File([document], "document.html", { type: "text/html" });

  formData.append("file", file);
  formData.append("exam_key", examKey);

  await fetch(sendDocumentApiUrl, {
    method: "POST",
    body: formData,
  });
};

const getDocument = async (): Promise<string> => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab.id) {
    throw new Error("No active tab");
  }
  const response = await chrome.tabs.sendMessage(tab.id, { type: "GET_HTML" });
  return response.html;
};

type QuestionResponse = {
  questions: Question[];
  keyFound: boolean;
};

const getQuestions = async (key: string): Promise<QuestionResponse> => {
  const response = await fetch(`${API_URL}/exams/${key}`);
  if (!response.ok) {
    return {
      questions: [],
      keyFound: false,
    };
  }

  const data = await response.json();
  return {
    questions: data,
    keyFound: true,
  };
};

export type Status = "not_started" | "processing" | "completed" | "failed";

export type Key = {
  key: string;
  name: string;
  status: Status;
};

type KeyResponse = Key[];

const getKeys = async (): Promise<KeyResponse> => {
  const response = await fetch(`${API_URL}/exams/`);
  const data = await response.json();

  console.log(data);
  return data;
};

export { sendDocument, getDocument, getQuestions, getKeys };
