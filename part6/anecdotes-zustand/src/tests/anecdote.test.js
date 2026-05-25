import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

vi.mock("../services/anecdote", () => ({
  default: {
    getAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  },
}));

import anecdoteService from "../services/anecdote";
import { useAnecdoteStore, useAnecdoteActions, useAnecdotes } from "../store";

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: "" });
  vi.clearAllMocks();
});

describe("useAnecdoteActions", () => {
  it("initialize loads anecdotes from service", async () => {
    const mockAnecdotes = [{ id: 1, content: "Test", votes: 0 }];
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes);

    const { result } = renderHook(() => useAnecdoteActions());

    await act(async () => {
      await result.current.initialize();
    });

    const { result: anecdoteResult } = renderHook(() => useAnecdotes());
    expect(anecdoteResult.current).toEqual(mockAnecdotes);
  });

  it("anecdotes from store sorted by votes", async () => {
    const anecdotes = [
      { id: "1", content: "Test", votes: 0 },
      { id: "2", content: "Test2", votes: 0 },
    ];

    anecdoteService.update.mockResolvedValue({
      id: "2",
      content: "Test2",
      votes: 1,
    });

    useAnecdoteStore.setState({ anecdotes: anecdotes });

    const { result } = renderHook(() => useAnecdoteActions());

    await act(async () => {
      await result.current.vote("2");
    });

    const { result: anecdoteResult } = renderHook(() => useAnecdotes());

    expect(anecdoteResult.current[0].votes === 1).toBe(true);
    expect(anecdoteResult.current[0].id).toEqual(anecdotes[1].id);
  });

  it("filter anecdotes", () => {
    const anecdotes = [
      { id: "1", content: "Test", votes: 0 },
      { id: "2", content: "Test2", votes: 2 },
      { id: "3", content: "Test3", votes: 0 },
    ];
    useAnecdoteStore.setState({ anecdotes, filter: "Test3" });
    const { result } = renderHook(() => useAnecdotes());
    expect(result.current).toEqual([anecdotes[2]]);
  });
});
