import { Controller } from 'react-hook-form';
import BundledEditor from './BundledEditor'

export default function TextEditor({ label, name, control, defaultVaule = "" }) {
  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <BundledEditor
            initialValue={defaultVaule}
            init={{
              height: "75vh",
              menubar: true,
              plugins: ["advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor", "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime", "media", "table", "code", "wordcount", "anchor",],
              toolbar: 'undo redo | blocks | ' +
                'bold italic underline forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>

  );
}