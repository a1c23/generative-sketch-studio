import { drawShape as flowShape, getGeometry as flowGeometry } from './shapes/flow.js';
import { drawShape as integrationShape, getGeometry as integrationGeometry } from './shapes/integration.js';
import { drawShape as aiShape, getGeometry as aiGeometry } from './shapes/ai.js';
import { drawShape as automationShape, getGeometry as automationGeometry } from './shapes/automation.js';
import { drawShape as securityShape, getGeometry as securityGeometry } from './shapes/security.js';
import { drawShape as dataShape, getGeometry as dataGeometry } from './shapes/data.js';
import { drawShape as experienceShape, getGeometry as experienceGeometry } from './shapes/experience.js';
import { drawShape as orchestrationShape, getGeometry as orchestrationGeometry } from './shapes/orchestration.js';

const categories = {
  flow: {
    key: 'flow',
    name: 'Flow Design',
    description: 'Workflow and process visualization',
    shape: flowShape,
    getGeometry: flowGeometry,
  },
  integration: {
    key: 'integration',
    name: 'Integration',
    description: 'System connectivity and APIs',
    shape: integrationShape,
    getGeometry: integrationGeometry,
  },
  ai: {
    key: 'ai',
    name: 'AI',
    description: 'Machine learning and intelligence',
    shape: aiShape,
    getGeometry: aiGeometry,
  },
  automation: {
    key: 'automation',
    name: 'Automation',
    description: 'Process automation and orchestration',
    shape: automationShape,
    getGeometry: automationGeometry,
  },
  security: {
    key: 'security',
    name: 'Security',
    description: 'Security and compliance',
    shape: securityShape,
    getGeometry: securityGeometry,
  },
  data: {
    key: 'data',
    name: 'Data',
    description: 'Data management and analytics',
    shape: dataShape,
    getGeometry: dataGeometry,
  },
  experience: {
    key: 'experience',
    name: 'Experience',
    description: 'User experience and interfaces',
    shape: experienceShape,
    getGeometry: experienceGeometry,
  },
  orchestration: {
    key: 'orchestration',
    name: 'Orchestration',
    description: 'Service orchestration and management',
    shape: orchestrationShape,
    getGeometry: orchestrationGeometry,
  },
};

export default categories;
export const categoryKeys = Object.keys(categories);
