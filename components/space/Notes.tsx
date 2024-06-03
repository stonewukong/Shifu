"use client";

import React, { useState } from "react";
import { TbLayoutSidebar as SidebarIcon } from "react-icons/tb";
import { IoIosSearch as Search } from "react-icons/io";
import { FiEdit as NewNote } from "react-icons/fi";
import { MDXEditor } from "./MDXEditor";

type Props = {};

export default function Notes({}: Props) {
  const [openNote, setOpenNote] = useState<boolean>(true);

  return (
    <div className="absolute left-56 top-20 flex h-[24rem] min-w-[192px] rounded-lg bg-white shadow-lg">
      <aside className="min-w-[14.5rem] overflow-auto rounded-l-lg border-r border-r-neutral-200">
        <div>
          <div className="sticky top-0 bg-white p-2">
            {/* Sidebar */}
            <span>
              <SidebarIcon
                color="#737373"
                size={"24px"}
                className="mb-2 cursor-pointer"
                onClick={() => setOpenNote((prev) => !prev)}
              />
            </span>
            {/* Search Box */}
            <div className="mb-2 flex items-center gap-2">
              <div className="flex items-center rounded-md border-2 border-neutral-400 pl-1">
                <Search size={"20px"} className="mr-1 fill-neutral-500" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-[144px] bg-transparent text-lg text-neutral-700 outline-none placeholder:text-neutral-400 focus:placeholder:text-transparent active:border-0"
                />
              </div>
              <div className="h-full cursor-pointer rounded-md bg-neutral-500 p-2 transition-colors duration-100 hover:bg-neutral-700">
                <NewNote size={"16px"} color="#fff" />
              </div>
            </div>
          </div>
          {/* Notes */}
          <div className="mt-2 flex flex-col gap-2 px-2 pb-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="w-full cursor-pointer list-none rounded-lg bg-neutral-600 p-2 text-white transition-colors duration-100 hover:bg-neutral-700"
              >
                {index}
              </div>
            ))}
          </div>
        </div>
      </aside>
      <div
        className={`w-full min-w-[30rem] ${openNote ? "" : "hidden"} overflow-auto rounded-e-lg bg-white p-2`}
      >
        <MDXEditor
          markdown={""}
          contentEditableClassName="outline-none text-lg py-3 px-2 prose prose-p:my-1 prose-p:leading-relaxed prose-headings:my-1 prose-blockquote:my-1 prose-ul:my-1 prose-li:my-1 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content=['']"
        />
      </div>
    </div>
  );
}
