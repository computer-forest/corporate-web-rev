
"use client";

import { useEffect, useState } from "react";

import { getApiErrorMessage } from "@/services/api/apiErrorHandler";
import { getHomePageBlogs } from "@/services/blog/blog.service";

import type { Blog } from "@/types/blog/blog.types";

export default function BlogSection() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadBlogs = async () => {
            try {
                setError("");

                const response = await getHomePageBlogs();

                setBlogs(response.data ?? []);
            } catch (error: unknown) {
                setError(getApiErrorMessage(error));
            }
        };

        void loadBlogs();
    }, []);

    return (
        <section
            className="section-padding-bottom"
            aria-labelledby="home-blogs-heading"
        >
            <div className="container">
                <h2 id="home-blogs-heading">
                    Latest Blogs
                </h2>

                {error && (
                    <div
                        className="alert alert-danger mt-3"
                        role="alert"
                    >
                        {error}
                    </div>
                )}

                {!error && blogs.length === 0 && (
                    <p className="mt-3">
                        No blogs are currently available.
                    </p>
                )}

                {blogs.length > 0 && (
                    <div className="row gy-4 mt-3">
                        {blogs.map((blog, index) => (
                            <div
                                className="col-12 col-md-4"
                                key={blog.blogId ?? index}
                            >
                                <article className="border rounded p-3 h-100">
                                    <h3 className="h5">
                                        {blog.blog_title || "Blog"}
                                    </h3>

                                    <p className="mb-0">
                                        {blog.blog_description ||
                                            "No description available"}
                                    </p>
                                </article>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
