import React, { useEffect, useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableSection = ({ section, onUpdate }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="border-2 border-dashed border-gray-300 p-4 mb-4 hover:border-blue-500 cursor-move">
        {section.type === 'hero' && (
          <div className="relative h-96">
            {section.background?.type === 'image' && (
              <img
                src={section.background.defaultSrc}
                alt="Hero Background"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white">
              <div className="text-center">
                <h1 className="text-5xl font-bold mb-4">{section.content.heading}</h1>
                <p className="text-xl mb-8">{section.content.subheading}</p>
                <button className="bg-white text-black px-8 py-3 rounded-lg">
                  {section.content.cta.text}
                </button>
              </div>
            </div>
          </div>
        )}

        {section.type === 'grid' && (
          <div className={`grid grid-cols-${section.columns} gap-6 p-4`}>
            {section.items.map((item, index) => (
              <div key={index} className="p-4 border rounded">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.description}</p>
                {item.price && (
                  <p className="text-lg font-bold mt-2">${item.price}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {section.type === 'contact' && (
          <div className="max-w-2xl mx-auto p-6">
            <form className="space-y-4">
              {section.form.fields.map((field, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700">
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      rows={4}
                      required={field.required}
                    />
                  ) : (
                    <input
                      type={field.type}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      required={field.required}
                    />
                  )}
                </div>
              ))}
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Send Message
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const TemplatePreview = ({ sections, onSectionsChange }) => {
  const [items, setItems] = useState(sections);

  useEffect(() => {
    setItems(sections);
  }, [sections]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      const oldIndex = items.findIndex(item => item.id === active.id);
      const newIndex = items.findIndex(item => item.id === over.id);
      
      const newItems = [...items];
      const [removed] = newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, removed);
      
      setItems(newItems);
      onSectionsChange(newItems);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map(section => (
          <SortableSection key={section.id} section={section} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default TemplatePreview;