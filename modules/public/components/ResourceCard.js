'use client';

import { useState } from 'react';
import { useLearning } from '@/modules/learner/components/LearningStore';
import { renderText } from '@/modules/shared/utils/renderText';

export default function ResourceCard({ resource, compact = false }) {
  const { data, toggleResource } = useLearning();
  const [preview, setPreview] = useState(false);

  if (!resource || typeof resource !== 'object') return null;

  const slug = renderText(resource.slug);
  const category = renderText(resource.category, 'Resource');
  const format = renderText(resource.format, 'FILE');
  const title = renderText(resource.title, 'Professional Resource');
  const description = renderText(resource.description);
  const saved = Boolean(slug && data.savedResources.includes(slug));

  function toggle() {
    if (slug) toggleResource(slug);
  }

  return (
    <>
      <article className={`card resource-card ${compact ? 'resource-compact' : ''}`}>
        <div className="course-topline">
          <span className="pill">{category}</span>
          <span className="file-badge">{format}</span>
        </div>
        <h3>{title}</h3>
        <p className="muted">{description}</p>
        <div className="resource-actions">
          <button className="button button-secondary button-small" type="button" onClick={() => setPreview(true)}>Preview</button>
          <button className={`button button-small ${saved ? 'button-secondary' : ''}`} type="button" onClick={toggle} disabled={!slug}>{saved ? 'Saved ✓' : 'Save resource'}</button>
        </div>
      </article>

      {preview ? (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setPreview(false)}>
          <div className="modal-card" role="dialog" aria-modal="true" aria-label={`${title} preview`}>
            <div className="row-between">
              <div><span className="pill">{category}</span><h2 style={{ marginTop: 16 }}>{title}</h2></div>
              <button className="modal-close" type="button" onClick={() => setPreview(false)} aria-label="Close preview">×</button>
            </div>
            <p className="lead">{description}</p>
            <div className="resource-preview">
              <div className="eyebrow">Template preview</div>
              <h3>Purpose</h3>
              <p>This resource provides a reusable structure for {title.toLowerCase()} work. Adapt fields and approval steps to your organization’s approved processes.</p>
              <h3>Suggested sections</h3>
              <ul>
                <li>Context and objective</li>
                <li>Owner and stakeholders</li>
                <li>Status, risks or decisions</li>
                <li>Actions and due dates</li>
                <li>Review / approval record</li>
              </ul>
            </div>
            <div className="row">
              <button className="button" type="button" onClick={toggle} disabled={!slug}>{saved ? 'Remove from saved' : 'Save to library'}</button>
              <button className="button button-secondary" type="button" onClick={() => window.print()}>Print / Export</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
