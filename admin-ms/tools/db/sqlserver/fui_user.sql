CREATE DATABASE [fui]
ON
PRIMARY
(
  NAME = N'fui',
  FILENAME = N'C:\Program Files (x86)\Microsoft SQL Server\MSSQL11.SQLEXPRESS\MSSQL\DATA\fui.ndf',
  SIZE = 4160KB,
  MAXSIZE = UNLIMITED,
  FILEGROWTH = 1MB
)
LOG ON
(
  NAME = N'fui_log',
  FILENAME = N'C:\Program Files (x86)\Microsoft SQL Server\MSSQL11.SQLEXPRESS\MSSQL\DATA\fui_log.ldf',
  SIZE = 512KB,
  MAXSIZE = UNLIMITED,
  FILEGROWTH = 10MB
)
GO

EXEC [fui].dbo.sp_changedbowner N'sa'