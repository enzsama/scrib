"use client";
import { type Doc } from "yjs";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import { stringToColor } from "@/lib/utils";

const Blocknote = ({
  doc,
  provider,
  userInfo,
}: {
  doc: Doc;
  provider: any;
  userInfo: { name: string; email: string };
}) => {
  const editor = useCreateBlockNote({
    collaboration: {
      provider,
      fragment: doc.getXmlFragment("document-info"),
      user: {
        name: userInfo.name,
        color: stringToColor(userInfo.email),
      },
    },
  });

  return <BlockNoteView editor={editor} theme="light" />;
};

export default Blocknote;
