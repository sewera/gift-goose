package log

import l "log"

func init() {
	l.Default().SetFlags(0)
}

func Info(msg string) {
	l.Default().Println(">> info: " + msg)
}

func Warn(msg string) {
	l.Default().Println(">> warn: " + msg)
}

func Error(msg string) {
	l.Default().Println(">> error: " + msg)
}

func Fatal(v ...any) {
	l.Default().Fatal(v...)
}
