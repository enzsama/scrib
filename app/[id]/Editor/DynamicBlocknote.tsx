"use client";
import dynamic from "next/dynamic";

export const Blocknote = dynamic(() => import("./Blocknote"), { ssr: false });
