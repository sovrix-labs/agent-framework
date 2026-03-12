import { Agent } from '../core/Agent';
import { RequirementGatheringAgent } from './requirements/RequirementGatheringAgent';
import { ArchitectureAgent } from './architecture/ArchitectureAgent';
import { SecurityAgent } from './security/SecurityAgent';
import { DevelopmentAgent } from './development/DevelopmentAgent';
import { TestingAgent } from './testing/TestingAgent';
import { CodeQualityAgent } from './quality/CodeQualityAgent';
import { OrchestratorAgent } from './orchestrator/OrchestratorAgent';

/**
 * Registry of all pre-built agents
 */
export function getPrebuiltAgents(): Record<string, Agent> {
  return {
    requirements: new RequirementGatheringAgent(),
    architecture: new ArchitectureAgent(),
    security: new SecurityAgent(),
    development: new DevelopmentAgent(),
    testing: new TestingAgent(),
    quality: new CodeQualityAgent(),
    orchestrator: new OrchestratorAgent()
  };
}

/**
 * Get a specific pre-built agent by name
 */
export function getPrebuiltAgent(name: string): Agent | undefined {
  const agents = getPrebuiltAgents();
  return agents[name];
}

/**
 * List all available pre-built agent names
 */
export function listPrebuiltAgentNames(): string[] {
  return Object.keys(getPrebuiltAgents());
}

// Export individual agents
export {
  RequirementGatheringAgent,
  ArchitectureAgent,
  SecurityAgent,
  DevelopmentAgent,
  TestingAgent,
  CodeQualityAgent,
  OrchestratorAgent
};
