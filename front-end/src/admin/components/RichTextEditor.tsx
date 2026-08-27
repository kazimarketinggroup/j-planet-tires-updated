import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

const modules = {
  toolbar: [
    [{ header: [2, 3, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    ['clean'],
  ],
};

const RichTextEditor = ({ value, onChange, placeholder }: RichTextEditorProps) => (
  <div className="admin-rte rounded-md border border-gray-300 [&_.ql-container]:rounded-b-md [&_.ql-container]:border-none [&_.ql-toolbar]:rounded-t-md [&_.ql-toolbar]:border-none [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-gray-200 [&_.ql-editor]:min-h-[160px]">
    <ReactQuill theme="snow" value={value} onChange={onChange} modules={modules} placeholder={placeholder} />
  </div>
);

export default RichTextEditor;
