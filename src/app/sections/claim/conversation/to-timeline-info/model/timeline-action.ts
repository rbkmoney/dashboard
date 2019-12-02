export enum TimelineAction {
    claimCreated = 'claimCreated', // создана заявка
    changesAdded = 'changesAdded', // добавлены изменения
    filesAdded = 'filesAdded', // добавлены файлы
    commentAdded = 'commentAdded', // добавлен комментарий
    statusReview = 'statusReview', // заявка отправлена на рассмотрение
    statusPending = 'statusPending', // заявка рассмотрена. Требуются дополнительные действия
    statusDenied = 'statusDenied', // заявка отклонена
    statusRevoked = 'statusRevoked', // заявка отозвана
    statusAccepted = 'statusAccepted' // заявка одобрена
}
