export type Status = "not_started" | "processing" | "completed" | "failed";

export type Exam = {
  id: string;
  name: string;
  status: Status;
};

export type ExamResponse = Exam[];


export type PresignedUrlRequest = {
  filePath: string;
  fileType: string;
};

export type PresignedUrlJson = {
  url: string;
  fields: {
    acl: string;
    "Content-Type": string;
    key: string;
    "AWSAccessKeyId": string;
    policy: string;
    signature: string;
  };
};

export type PresignedUrlResponse = {
  url: string;
  fields: {
    acl: string;
    contentType: string;
    key: string;
    awsAccessKeyId: string;
    policy: string;
    signature: string;
  }
}
