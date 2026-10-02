import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h2: (props) => <h2 className="mt-6 mb-0 text-[22px] font-semibold tracking-[-0.01em]" {...props} />,
  h3: (props) => <h3 className="mt-4 mb-0 text-base font-semibold" {...props} />,
  p: (props) => <p className="m-0" {...props} />,
  a: (props) => <a className="underline underline-offset-3 hover:text-muted" {...props} />,
  ul: (props) => <ul className="m-0 flex list-disc flex-col gap-1.5 pl-5 marker:text-faint" {...props} />,
  ol: (props) => <ol className="m-0 flex list-decimal flex-col gap-1.5 pl-5 marker:text-faint" {...props} />,
  blockquote: (props) => <blockquote className="m-0 border-l-2 border-line pl-4 text-muted" {...props} />,
  hr: () => <hr className="my-2 border-line" />,
  code: (props) => <code className="rounded-md bg-chip px-1.5 py-0.5 font-mono text-[13px]" {...props} />,
  pre: (props) => (
    <pre
      className="m-0 overflow-x-auto rounded-xl border border-line bg-chip p-4 font-mono text-[13px] leading-[1.6] [&_code]:bg-transparent [&_code]:p-0"
      {...props}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
