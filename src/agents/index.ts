import { Agent } from '../core/Agent';
import { ArchitectAgent } from './architect/ArchitectAgent';
import { SecurityAgent } from './security/SecurityAgent';
import { DevelopmentAgent } from './development/DevelopmentAgent';
import { QAAgent } from './qa/QAAgent';
import { OrchestratorAgent } from './orchestrator/OrchestratorAgent';

export function getPrebuiltAgents(): Record<string, Agent> {
  return {
    architect: new ArchitectAgent(),
    security: new SecurityAgent(),
    development: new DevelopmentAgent(),
    qa: new QAAgent(),
    orchestrator: new OrchestratorAgent()
  };
}

export {
  ArchitectAgent,
  SecurityAgent,
  DevelopmentAgent,
  QAAgent,
  OrchestratorAgent
};
