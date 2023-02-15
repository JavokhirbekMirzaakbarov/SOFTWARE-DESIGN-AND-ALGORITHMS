import { Demand } from './types';

export const mockClient = [
  { name: 'Philip', demands: [Demand.Driving, Demand.Fighting], position: { x: 10, y: 30 }, reward: 600 },
  { name: 'Payne', demands: [Demand.Driving], position: { x: 5, y: 2 }, reward: 99 },
  { name: 'Paul', demands: [Demand.Fighting], position: { x: 10, y: 6 }, reward: 330 },
  { name: 'Raul', demands: null, position: { x: 0, y: 10 }, reward: 80 },
  { name: 'Fred', demands: [Demand.Fishing], position: { x: 15, y: 12 }, reward: 400 },
  { name: 'John', demands: [Demand.Fishing, Demand.Fighting], position: { x: 0, y: 0 }, reward: 250 },
];

export const mockExecutor = {
  name: 'executor',
  position: { x: 2, y: 0 },
  possibilities: [Demand.Fishing, Demand.Driving]
};
