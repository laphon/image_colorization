if __name__ == '__main__':
    import uvicorn

    try:
        uvicorn.run('main:app', host='0.0.0.0', port=8000)
    except Exception:
        pass
