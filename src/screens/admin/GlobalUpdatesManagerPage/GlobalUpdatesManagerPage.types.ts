export type GlobalUpdatesManagerPageProps = Record<string, never>;

export type UseGlobalUpdatesManagerPageProps = GlobalUpdatesManagerPageProps;

export type GlobalUpdateActionHandlers = {
  handleViewUpdate: (id: string) => void;
  handleEditUpdate: (id: string) => void;
  handleDeleteUpdate: (id: string, name?: string) => void;
  handleDeliverUpdate: (id: string, name?: string) => void;
  handleCreateUpdate: () => void;
};
