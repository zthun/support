import { ZRoute, ZWebAppLayout } from '@zthun/works.react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ZSupportHomePage } from './home/home-page';

const container = createRoot(document.getElementById('support.zthunworks'));

container.render(
  <ZWebAppLayout whoami='support' profileApp='roadblock'>
    <ZRoute path='/' element={<ZSupportHomePage />} />
  </ZWebAppLayout>
);
