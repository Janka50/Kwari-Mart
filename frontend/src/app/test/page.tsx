"use client";

import { useEffect } from "react";
import api from "@/lib/api";

export default function TestPage() {
  useEffect(() => {
    api
      .get("/stores/")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return <div>Testing Django API...</div>;
}