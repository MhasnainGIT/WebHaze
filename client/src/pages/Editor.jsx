import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import WYSIWYGEditor from '../components/editor/WYSIWYGEditor';
import TemplatePreview from '../preview/TemplatePreview';

const Editor = () => {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('content');

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await axios.get(`/api/pages/${pageId}`);
        setPage(response.data);
      } catch (error) {
        console.error('Error fetching page:', error);
      } finally {
        setLoading(false);
      }
    };

    if (pageId) {
      fetchPage();
    } else {
      setLoading(false);
    }
  }, [pageId]);

  const handleSave = async () => {
    try {
      setSaving(true);
      if (pageId) {
        await axios.put(`/api/pages/${pageId}`, page);
      } else {
        const response = await axios.post('/api/pages', page);
        navigate(`/editor/${response.data._id}`);
      }
    } catch (error) {
      console.error('Error saving page:', error);
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    try {
      setSaving(true);
      const updatedPage = { ...page, status: 'published' };
      await axios.put(`/api/pages/${pageId}`, updatedPage);
      setPage(updatedPage);
    } catch (error) {
      console.error('Error publishing page:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleSectionsChange = (newSections) => {
    setPage(prev => ({
      ...prev,
      content: {
        ...prev.content,
        sections: newSections
      }
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex space-x-4 items-center">
          <input
            type="text"
            value={page?.title || ''}
            onChange={(e) => setPage(prev => ({ ...prev, title: e.target.value }))}
            className="text-xl font-bold border-none focus:ring-0"
            placeholder="Page Title"
          />
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('content')}
              className={`px-4 py-2 rounded ${
                activeTab === 'content'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              Content
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 rounded ${
                activeTab === 'preview'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab('seo')}
              className={`px-4 py-2 rounded ${
                activeTab === 'seo'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              SEO
            </button>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Save Draft
          </button>
          <button
            onClick={handlePublish}
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Publish
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {activeTab === 'content' && (
          <div className="max-w-4xl mx-auto p-6">
            <TemplatePreview
              sections={page?.content?.sections || []}
              onSectionsChange={handleSectionsChange}
            />
          </div>
        )}

        {activeTab === 'preview' && (
          <iframe
            src={`/preview/${pageId}`}
            className="w-full h-full border-none"
            title="Page Preview"
          />
        )}

        {activeTab === 'seo' && (
          <div className="max-w-2xl mx-auto p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={page?.seo?.metaTitle || ''}
                  onChange={(e) =>
                    setPage(prev => ({
                      ...prev,
                      seo: { ...prev.seo, metaTitle: e.target.value }
                    }))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Meta Description
                </label>
                <textarea
                  value={page?.seo?.metaDescription || ''}
                  onChange={(e) =>
                    setPage(prev => ({
                      ...prev,
                      seo: { ...prev.seo, metaDescription: e.target.value }
                    }))
                  }
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Editor;