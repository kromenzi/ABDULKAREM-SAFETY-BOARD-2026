import type { LocalAgentKey } from './local-ai-engine';

export interface AgentNode {
  key: LocalAgentKey;
  role: string;
  description: string;
}

export const SAFETY_AGENT_GRAPH: AgentNode[] = [
  { key: 'safety-orchestrator', role: 'orchestrator', description: 'Coordinates the complete internal safety workflow.' },
  { key: 'risk-agent', role: 'risk', description: 'Performs risk assessment using internal evidence and rules.' },
  { key: 'incident-agent', role: 'incident', description: 'Performs incident investigation and root-cause analysis.' },
  { key: 'ncr-agent', role: 'ncr', description: 'Creates NCR recommendations from verified findings.' },
  { key: 'vision-agent', role: 'vision', description: 'Coordinates internal image/OCR evidence processing.' },
];

export const SAFETY_AGENT_EDGES: Array<[LocalAgentKey, LocalAgentKey]> = [
  ['safety-orchestrator', 'vision-agent'],
  ['safety-orchestrator', 'risk-agent'],
  ['safety-orchestrator', 'incident-agent'],
  ['risk-agent', 'ncr-agent'],
  ['incident-agent', 'ncr-agent'],
];
