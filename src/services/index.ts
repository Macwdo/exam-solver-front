import type { ExamResponse, PresignedUrlResponse, PresignedUrlRequest, Exam } from "./types";
import type { ExamAnswer } from "@/components/app/questions/questions";


const API_URL = "https://exam-solver-api.up.railway.app";

const service = {  
  getDocument: async (): Promise<string> => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab.id) {
      throw new Error("No active tab");
    }
    const response = await chrome.tabs.sendMessage(tab.id, { type: "GET_HTML" });
    return response.html;
  },

  sendDocument: async (document: string, examId: string) => {
    const documentName = service.generateDocumentName()
    await service.uploadDocumentToS3(documentName, document)
    await service.sendFilePathToBackend(documentName, examId)
  },

  sendFilePathToBackend: async (documentName: string, examId: string) => {
    await fetch(`${API_URL}/upload-documents/${examId}/`, {
      method: "POST",
      body: JSON.stringify({
        file_path: documentName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  uploadDocumentToS3: async (documentName: string, document: string) => {
      const formData = new FormData();
      const file = new File([document], documentName, { type: "text/html" });
      const presignedUrl = await service.getPresignedUrl({
          filePath: documentName,
          fileType: "text/html",
      });
      Object.entries(presignedUrl.fields).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("file", file);
      await fetch(presignedUrl.url, { method: "POST", body: formData});
  },

  getExam: async (examId: string): Promise<Exam> => {
    const response = await fetch(`${API_URL}/exams/${examId}/`);
    const data = await response.json();

    return data
  },

  getExams: async (): Promise<ExamResponse> => {
    const response = await fetch(`${API_URL}/exams/`);
    const data = await response.json();
  
    return data;
  },

  getPresignedUrl: async (request: PresignedUrlRequest): Promise<PresignedUrlResponse> => {
    const response = await fetch(`${API_URL}/get-presigned-url/`, {
      method: "POST",
      body: JSON.stringify({
        file_path: request.filePath,
        file_type: request.fileType,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  },

  generateDocumentName: (): string => {
    const randomName = crypto.randomUUID().split("-")[0].toUpperCase()
    return `${randomName}.html`
  },
};

export default service;
