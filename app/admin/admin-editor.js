'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const emptyHomepage = {
  hero: { eyebrow: '', title: '', lead: '' },
  stats: [],
  programs: [],
  engagements: [],
  leadership: [],
  insights: [],
  cta: { title: '', button: '' },
  contact: { heading: '', list: [] },
};

const initialData = { homepage: emptyHomepage, news: [], events: [] };

function getList(data, listName) {
  const keys = listName.split('.');
  let value = data;
  for (const key of keys) value = value?.[key];
  return value;
}

function setList(data, listName, list) {
  const keys = listName.split('.');
  const next = structuredClone(data);
  let target = next;
  for (let index = 0; index < keys.length - 1; index += 1) target = target[keys[index]];
  target[keys[keys.length - 1]] = list;
  return next;
}

export default function AdminEditor() {
  const [formData, setFormData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadContent() {
      try {
        const response = await fetch('/api/admin/content', { cache: 'no-store' });
        if (!response.ok) throw new Error('Unable to load saved content.');
        const { data } = await response.json();
        setFormData({
          homepage: { ...emptyHomepage, ...(data?.homepage || {}) },
          news: data?.news || [],
          events: data?.events || [],
        });
      } catch (error) {
        setMessage(error.message || 'Unable to load content.');
      } finally {
        setIsLoading(false);
      }
    }
    loadContent();
  }, []);

  const updateHomepage = (path, value) => {
    setFormData((previous) => {
      const next = structuredClone(previous);
      let target = next.homepage;
      const keys = path.split('.');
      for (let index = 0; index < keys.length - 1; index += 1) target = target[keys[index]];
      target[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const updateItem = (listName, index, key, value) => {
    const list = [...(getList(formData, listName) || [])];
    list[index] = { ...list[index], [key]: value };
    setFormData((previous) => setList(previous, listName, list));
  };

  const updateString = (listName, index, value) => {
    const list = [...(getList(formData, listName) || [])];
    list[index] = value;
    setFormData((previous) => setList(previous, listName, list));
  };

  const addItem = (listName, item) => {
    const list = [...(getList(formData, listName) || []), { ...item, id: `${listName}-${Date.now()}` }];
    setFormData((previous) => setList(previous, listName, list));
  };

  const removeItem = (listName, index) => {
    const list = (getList(formData, listName) || []).filter((_, itemIndex) => itemIndex !== index);
    setFormData((previous) => setList(previous, listName, list));
  };

  async function uploadImage(event, onUploaded) {
    const file = event.target.files?.[0];
    if (!file) return;
    const body = new FormData();
    body.append('file', file);
    setMessage('Uploading image...');
    try {
      const response = await fetch('/api/upload', { method: 'POST', body });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Image upload failed.');
      onUploaded(result.url);
      setMessage('Image uploaded. Save changes to publish it.');
    } catch (error) {
      setMessage(error.message || 'Image upload failed.');
    } finally {
      event.target.value = '';
    }
  }

  async function saveContent() {
    setSaving(true);
    setMessage('');
    try {
      const response = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to save content.');
      setMessage('Changes saved. The public homepage now uses this content.');
    } catch (error) {
      setMessage(error.message || 'Unable to save content.');
    } finally {
      setSaving(false);
    }
  }

  const textField = (label, value, onChange, multiline = false) => (
    <label>
      {label}
      {multiline ? <textarea value={value || ''} onChange={(event) => onChange(event.target.value)} rows={3} /> : <input value={value || ''} onChange={(event) => onChange(event.target.value)} />}
    </label>
  );

  function editRecords({ title, listName, sectionId, template, fields, imageField }) {
    const records = getList(formData, listName) || [];
    return (
      <section className="admin-panel" id={sectionId} key={listName}>
        <div className="panel-header">
          <h2>{title}</h2>
          <button type="button" className="btn btn-secondary compact" onClick={() => addItem(listName, template)}>Add</button>
        </div>
        {records.map((item, index) => (
          <div className="mini-editor stacked" key={item.id || `${listName}-${index}`}>
            {fields.map(([key, label, multiline, isDate]) => (
              <label key={key}>
                {label}
                {multiline ? (
                  <textarea value={item[key] || ''} onChange={(event) => updateItem(listName, index, key, event.target.value)} rows={3} />
                ) : (
                  <input type={isDate ? 'date' : 'text'} value={item[key] || ''} onChange={(event) => updateItem(listName, index, key, event.target.value)} />
                )}
              </label>
            ))}
            {imageField && (
              <label>
                {imageField[1]}
                <input value={item[imageField[0]] || ''} onChange={(event) => updateItem(listName, index, imageField[0], event.target.value)} placeholder="Image URL or /images/file.jpg" />
                <input type="file" accept="image/*" onChange={(event) => uploadImage(event, (url) => updateItem(listName, index, imageField[0], url))} />
              </label>
            )}
            <button type="button" className="btn btn-danger compact" onClick={() => removeItem(listName, index)}>Delete</button>
          </div>
        ))}
      </section>
    );
  }

  if (isLoading) return <main className="admin-shell dashboard-shell"><div className="admin-card"><p className="admin-muted">Loading saved content...</p></div></main>;

  return (
    <main className="admin-shell dashboard-shell">
      <div className="admin-card dashboard-card">
        <div className="dashboard-header">
          <div><p className="section-kicker">Admin dashboard</p><h1>AFRICSIS content management</h1></div>
          <div className="dashboard-actions"><Link href="/" className="btn btn-secondary">View site</Link><form action="/api/admin/logout" method="POST"><button className="btn btn-secondary" type="submit">Log out</button></form></div>
        </div>
        {message && <p className="admin-message" role="status">{message}</p>}

        <div className="dashboard-layout">
          <aside className="admin-sidebar">
            <p className="admin-sidebar-title">Content editor</p>
            <nav aria-label="Dashboard sections">
              <a href="#hero">Homepage hero</a>
              <a href="#statistics">Statistics</a>
              <a href="#programs">Programs</a>
              <a href="#engagement">Engagement</a>
              <a href="#leadership">Leadership</a>
              <a href="#insights">Homepage insights</a>
              <a href="#news">News</a>
              <a href="#events">Events</a>
              <a href="#contact">Contact &amp; CTA</a>
            </nav>
          </aside>

          <div className="dashboard-content">
            <section className="admin-panel" id="hero">
              <div className="panel-header"><h2>Homepage hero</h2></div>
              <div className="admin-form-grid">
                {textField('Eyebrow', formData.homepage.hero?.eyebrow, (value) => updateHomepage('hero.eyebrow', value))}
                {textField('Title', formData.homepage.hero?.title, (value) => updateHomepage('hero.title', value))}
                <div className="full-span">{textField('Lead text', formData.homepage.hero?.lead, (value) => updateHomepage('hero.lead', value), true)}</div>
              </div>
            </section>

            <section className="admin-panel" id="statistics">
              <div className="panel-header"><h2>Homepage statistics</h2><button className="btn btn-secondary compact" type="button" onClick={() => addItem('homepage.stats', { value: 'New', label: 'Stat label' })}>Add stat</button></div>
              {(formData.homepage.stats || []).map((item, index) => <div className="mini-editor" key={item.id || index}><input aria-label="Stat value" value={item.value || ''} onChange={(event) => updateItem('homepage.stats', index, 'value', event.target.value)} /><input aria-label="Stat label" value={item.label || ''} onChange={(event) => updateItem('homepage.stats', index, 'label', event.target.value)} /><button className="btn btn-danger compact" type="button" onClick={() => removeItem('homepage.stats', index)}>Delete</button></div>)}
            </section>

            {editRecords({ title: 'Programs', listName: 'homepage.programs', sectionId: 'programs', template: { label: 'PRG', title: 'New program', text: '' }, fields: [['label', 'Code'], ['title', 'Program name'], ['text', 'Description', true]] })}
            <section className="admin-panel" id="engagement">
              <div className="panel-header"><h2>Impact and engagement</h2><button className="btn btn-secondary compact" type="button" onClick={() => addItem('homepage.engagements', 'New engagement')}>Add item</button></div>
              {(formData.homepage.engagements || []).map((item, index) => <div className="mini-editor" key={`${item}-${index}`}><input aria-label="Engagement text" value={item} onChange={(event) => updateString('homepage.engagements', index, event.target.value)} /><button className="btn btn-danger compact" type="button" onClick={() => removeItem('homepage.engagements', index)}>Delete</button></div>)}
            </section>
            {editRecords({ title: 'Leadership', listName: 'homepage.leadership', sectionId: 'leadership', template: { name: 'New leader', title: 'Role', bio: '', image: '' }, fields: [['name', 'Name'], ['title', 'Role'], ['bio', 'Biography', true]], imageField: ['image', 'Portrait'] })}
            {editRecords({ title: 'Homepage insights', listName: 'homepage.insights', sectionId: 'insights', template: { category: 'News', title: 'New story', summary: '', image: '' }, fields: [['category', 'Category'], ['title', 'Title'], ['summary', 'Summary', true]], imageField: ['image', 'Story image'] })}
            {editRecords({ title: 'News', listName: 'news', sectionId: 'news', template: { title: 'New article', category: 'News', summary: '', date: new Date().toISOString().slice(0, 10) }, fields: [['title', 'Title'], ['category', 'Category'], ['date', 'Publication date', false, true], ['summary', 'Summary', true]] })}
            {editRecords({ title: 'Events', listName: 'events', sectionId: 'events', template: { title: 'New event', date: new Date().toISOString().slice(0, 10), location: '', description: '' }, fields: [['title', 'Title'], ['date', 'Date', false, true], ['location', 'Location'], ['description', 'Description', true]] })}

            <section className="admin-panel" id="contact">
              <div className="panel-header"><h2>Contact and call to action</h2></div>
              <div className="admin-form-grid">
                {textField('Contact heading', formData.homepage.contact?.heading, (value) => updateHomepage('contact.heading', value))}
                {textField('CTA title', formData.homepage.cta?.title, (value) => updateHomepage('cta.title', value))}
                {textField('CTA button label', formData.homepage.cta?.button, (value) => updateHomepage('cta.button', value))}
              </div>
            </section>
            <div className="dashboard-footer"><button type="button" className="btn btn-primary" onClick={saveContent} disabled={saving}>{saving ? 'Saving changes...' : 'Save all changes'}</button></div>
          </div>
        </div>
      </div>
    </main>
  );
}
