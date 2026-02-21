import { drawShape as flowShape } from './shapes/flow.js';
import { drawShape as integrationShape } from './shapes/integration.js';
import { drawShape as aiShape } from './shapes/ai.js';
import { drawShape as automationShape } from './shapes/automation.js';
import { drawShape as securityShape } from './shapes/security.js';
import { drawShape as dataShape } from './shapes/data.js';
import { drawShape as experienceShape } from './shapes/experience.js';
import { drawShape as orchestrationShape } from './shapes/orchestration.js';

const categories = {
  flow: {
    key: 'flow',
    name: 'Flow Design',
    description: 'Workflow and process visualization',
    shape: flowShape,
  },
  integration: {
    key: 'integration',
    name: 'Integration',
    description: 'System connectivity and APIs',
    shape: integrationShape,
  },
  ai: {
    key: 'ai',
    name: 'AI',
    description: 'Machine learning and intelligence',
    shape: aiShape,
  },
  automation: {
    key: 'automation',
    name: 'Automation',
    description: 'Process automation and orchestration',
    shape: automationShape,
  },
  security: {
    key: 'security',
    name: 'Security',
    description: 'Security and compliance',
    shape: securityShape,
  },
  data: {
    key: 'data',
    name: 'Data',
    description: 'Data management and analytics',
    shape: dataShape,
  },
  experience: {
    key: 'experience',
    name: 'Experience',
    description: 'User experience and interfaces',
    shape: experienceShape,
  },
  orchestration: {
    key: 'orchestration',
    name: 'Orchestration',
    description: 'Service orchestration and management',
    shape: orchestrationShape,
  },
};

export default categories;
export const categoryKeys = Object.keys(categories);
