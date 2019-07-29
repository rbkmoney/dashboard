export enum TimelineAction {
    claimCreated, // создана заявка
    changesAdded, // добавлены изменения
    documentsAdded, // добавлены документы
    commentAdded, // добавлен комментарий
    statusReview, // заявка отправлена на рассмотрение
    statusPendingAcceptance, // заявка рассмотренна. Требуются ваши действия.
    statusDenied, // заявка отклонена
    statusRevoked, // заявка отозвана
    statusAccepted, // заявка одобрена
    statusPending // заявка переведена в статус: В работе
}
